output "client_certificate" {
  value = google_container_cluster.this.master_auth.0.client_certificate
  description = "Kube client certificate"
}

output "client_key" {
  value = google_container_cluster.this.master_auth.0.client_key
  description = "Kube client key"
}

output "cluster_ca_certificate" {
  value = google_container_cluster.this.master_auth.0.cluster_ca_certificate
  description = "Kube cluster CA certificate"
}

output "endpoint" {
  value = google_container_cluster.this.endpoint
  description = "Kube cluster endpoint"
}
