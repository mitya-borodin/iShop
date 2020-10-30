output "region" {
  value       = var.region
  description = "region"
}

output "kubernetes_cluster_name" {
  value       = google_container_cluster.primary.name
  description = "GKE Cluster Name"
}

output "kubernaties_cluster_host" {
  value       = google_container_cluster.primary.endpoint
  description = "Base64 encoded public certificate used by clients to authenticate to the cluster endpoint."
}
