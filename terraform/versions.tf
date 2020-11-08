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
  zone    = var.zone
}

provider "helm" {
  version = "1.3.2"

  kubernetes {
    load_config_file = false

    host = "https://${module.kube.endpoint}"

    client_certificate     = base64decode(module.kube.client_certificate)
    client_key             = base64decode(module.kube.client_key)
    cluster_ca_certificate = base64decode(module.kube.cluster_ca_certificate)
  }
}
