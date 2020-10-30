terraform {
  required_version = ">= 0.12"
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
  version = "3.5.0"

  credentials = file(var.credentials_file)

  project = var.project
  region  = var.region
  zone    = var.zone
}

# VPC
resource "google_compute_network" "vpc" {
  name                    = "${var.project}-vpc"
  auto_create_subnetworks = "false"
}

# Subnet
resource "google_compute_subnetwork" "subnet" {
  name          = "${var.project}-subnet"
  region        = var.region
  network       = google_compute_network.vpc.name
  ip_cidr_range = "10.10.0.0/24"
}

# GKE cluster
resource "google_container_cluster" "primary" {
  name     = "${var.project}-gke"
  location = var.region

  remove_default_node_pool = true
  initial_node_count       = 1

  network    = google_compute_network.vpc.name
  subnetwork = google_compute_subnetwork.subnet.name
}

# Separately Managed Node Pool
resource "google_container_node_pool" "primary_nodes" {
  name       = "${google_container_cluster.primary.name}-node-pool"
  location   = var.region
  cluster    = google_container_cluster.primary.name
  node_count = var.gke_num_nodes

  node_config {
    preemptible  = true
    machine_type = "e2-micro"
    disk_size_gb = 10
    tags         = ["gke-node", "${var.project}-gke"]
    metadata = {
      disable-legacy-endpoints = "true"
    }
    labels = {
      env = var.project
    }
    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]
  }
}

provider "helm" {
  version = "1.3.2"

  debug = true

  kubernetes {
    load_config_file = false

    host     = google_container_cluster.primary.endpoint
    username = google_container_cluster.primary.master_auth[0].username
    password = google_container_cluster.primary.master_auth[0].password

    client_certificate     = google_container_cluster.primary.master_auth.0.client_certificate
    client_key             = google_container_cluster.primary.master_auth.0.client_key
    cluster_ca_certificate = google_container_cluster.primary.master_auth.0.cluster_ca_certificate
  }
}

resource "helm_release" "ingress-nginx" {
  name       = "my-ingress-nginx"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  version    = "3.7.1"
}

resource "helm_release" "cert-manager" {
  name       = "my-cert-manager"
  repository = "https://charts.jetstack.io"
  chart      = "cert-manager"
  version    = "1.0.4"
  namespace  = "cert-manager"
}
