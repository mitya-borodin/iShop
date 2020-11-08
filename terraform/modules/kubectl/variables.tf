variable "client_certificate" {
  description = "Kube client certificate"
  type        = string
}

variable "client_key" {
  description = "Kube client key"
  type        = string
}

variable "cluster_ca_certificate" {
  description = "Kube cluster CA certificate"
  type        = string
}

variable "endpoint" {
  description = "Kube cluster endpoint"
  type        = string
}
