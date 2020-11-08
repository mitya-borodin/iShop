# GKE cluster
resource "google_container_cluster" "this" {
  name     = var.name
  location = var.zone


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
}

# Separately Managed Node Pool
resource "google_container_node_pool" "this" {
  cluster    = google_container_cluster.this.name
  name       = "${var.name}-pool"
  location   = var.zone
  node_count = var.machines

  node_config {
    machine_type = var.machine_type
    tags         = [var.name, "kube"]

    disk_type    = "pd-ssd"
    disk_size_gb = 5

    oauth_scopes = [
      "https://www.googleapis.com/auth/compute",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]
  }
}
