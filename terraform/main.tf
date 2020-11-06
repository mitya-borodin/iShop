terraform {
  required_version = ">= 0.13"
  required_providers {
    google = {
      source = "hashicorp/google"
    }
    helm = {
      source = "hashicorp/helm"
    }
    kubernetes = {
      source = "hashicorp/kubernetes"
    }
  }
}

provider "google" {
  version = "3.46.0"

  credentials = file(var.credentials_file)

  project = var.project
  region  = var.region
  zone    = var.zone
}

// Enable Cloud Resource Manager API on a fresh project
// (required for doing the destroy)
#resource "google_project_service" "cloudresourcemanager" {
#  project = var.project
#  service = "cloudresourcemanager.googleapis.com"
#
#  disable_on_destroy = false
#}

// Enable Container API on a fresh project
#resource "google_project_service" "container" {
#  project = var.project
#  service = "container.googleapis.com"
#
#  disable_on_destroy = false
#}

// Enable Cloud Build
resource "google_project_service" "cloudbuild" {
  project = var.project
  service = "cloudbuild.googleapis.com"

  disable_on_destroy = false
}

// Enable Compute Engine API on a fresh project
resource "google_project_service" "compute" {
  project = var.project
  service = "compute.googleapis.com"

  disable_on_destroy = false
}

data "google_project" "this" {
  project_id = var.project
}


// Add Project Editor role to the Cloud Build service account
// (required to be able to work with Kube and with any other project resources)
resource "google_project_iam_member" "cloudbuild_sa_editor" {
  depends_on = [google_project_service.cloudbuild]

  project = var.project
  role    = "roles/editor"
  member  = "serviceAccount:${data.google_project.this.number}@cloudbuild.gserviceaccount.com"
}

# GKE cluster
resource "google_container_cluster" "primary" {
  name     = var.cluster_name
  location = var.region

  # We can't create a cluster with no node pool defined, but we want to only use
  # separately managed node pools. So we create the smallest possible default
  # node pool and immediately delete it.
  remove_default_node_pool = true
  initial_node_count       = 1

  enable_legacy_abac = true

  master_auth {
    client_certificate_config {
      issue_client_certificate = true
    }
  }

  provisioner "local-exec" {
    command = <<EOT
      export KUBECONFIG=$(pwd)/.kube/config && \
      mkdir -p .kube && \
      echo ${google_container_cluster.primary.master_auth[0].cluster_ca_certificate}​​​​​​​​ | base64 -D > .kube/ca.crt && \
      echo ${google_container_cluster.primary.master_auth[0].client_certificate}​​​​​​​​ | base64 -D > .kube/client.crt && \
      echo ${google_container_cluster.primary.master_auth[0].client_key}​​​​​​​​ | base64 -D > .kube/client.key && \
      kubectl config set-cluster ${google_container_cluster.primary.name} \
        --server=https://${google_container_cluster.primary.endpoint}​​​​​​​​ \
        --certificate-authority=.kube/ca.crt \
        --embed-certs && \
      kubectl config set-credentials default \
        --certificate-authority=.kube/ca.crt \
        --client-certificate=.kube/client.crt \
        --client-key=.kube/client.key \
        --embed-certs && \
      kubectl config set-context default --cluster=${google_container_cluster.primary.name} --user=default && \
      kubectl config use-context default && \
      echo '#!/bin/sh' > kubectl && \
      echo 'KUBECONFIG=.kube/config kubectl "$@"' >> kubectl && \
      chmod a+x ./kubectl && \
      echo '#!/bin/sh' > helm && \
      echo 'KUBECONFIG=.kube/config helm "$@"' >> helm && \
      chmod a+x ./helm
    EOT
  }

  provisioner "local-exec" {
    command = <<EOT
      export KUBECONFIG=$(pwd)/.kube/config_gcloud && \
      export CLOUDSDK_CORE_DISABLE_PROMPTS=1 && \
      mkdir -p .kube && \
      gcloud components update kubectl && \
      gcloud auth activate-service-account --key-file ${var.credentials_file} && \
      gcloud config set project ${var.project} && \
      gcloud config set compute/zone ${var.region} && \
      gcloud container clusters get-credentials ${var.cluster_name} && \
      echo '#!/bin/sh' > kubectl_g && \
      echo 'KUBECONFIG=.kube/config_gcloud kubectl "$@"' >> kubectl_g && \
      chmod a+x ./kubectl_g && \
      echo '#!/bin/sh' > helm_g && \
      echo 'KUBECONFIG=.kube/config_gcloud helm "$@"' >> helm_g && \
      chmod a+x ./helm_g
    EOT
  }
}

# Separately Managed Node Pool
resource "google_container_node_pool" "primary_nodes" {
  name       = var.cluster_node_pool_name
  location   = var.region
  cluster    = google_container_cluster.primary.name
  node_count = var.machines

  node_config {
    machine_type = var.machine_type
    disk_size_gb = 10
    tags         = [var.cluster_name, "kube"]
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
      "https://www.googleapis.com/auth/compute",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]
  }
}

provider "helm" {
  version = "1.3.2"

  kubernetes {
    load_config_file = false

    host = google_container_cluster.primary.endpoint

    client_certificate     = base64decode(google_container_cluster.primary.master_auth[0].client_certificate)
    client_key             = base64decode(google_container_cluster.primary.master_auth[0].client_key)
    cluster_ca_certificate = base64decode(google_container_cluster.primary.master_auth[0].cluster_ca_certificate)
  }
}

resource "helm_release" "ingress-nginx" {
  depends_on = [google_container_node_pool.primary_nodes]

  name       = "my-ingress-nginx"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  version    = "3.7.1"
}

resource "helm_release" "cert-manager" {
  depends_on = [google_container_node_pool.primary_nodes]

  name             = "my-cert-manager"
  repository       = "https://charts.jetstack.io"
  chart            = "cert-manager"
  version          = "1.1.0-alpha.1"
  create_namespace = true
  namespace        = "cert-manager"

  max_history = 5
  wait        = true

  set {
    name  = "installCRDs"
    value = true
  }
}
