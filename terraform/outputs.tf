output "cluster_ca_certificate" {
  value       = module.kube.cluster_ca_certificate
  description = "Kube cluster CA certificate"
}

output "client_certificate" {
  value       = module.kube.client_certificate
  description = "Kube client certificate"
}

output "client_key" {
  value       = module.kube.client_key
  description = "Kube client key"
}

output "host" {
  value       = "https://${module.kube.endpoint}"
  description = "Kube cluster hostname"
}
