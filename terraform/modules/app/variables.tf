variable "name" {
  description = "Application name"
  type        = string
  default     = "e-commerce-nodejs"
}

variable "dbName" {
  description = "Database name"
  type        = string
  default     = "e-commerce-nodejs-data-base"
}

variable "domain" {
  description = "Domain name"
  type        = string
  default     = "e-commerce-nodejs.ru"
}

variable "email" {
  description = "Email for getting certificate from letsencrypt"
  type        = string
  default     = "dmitriy@borodin.site"
}

variable "letsencryptServer" {
  description = "Letsencrypt server"
  type        = string
  default     = "https://acme-v02.api.letsencrypt.org/directory"
}

variable "clusterIssuerName" {
  description = "Cluster Issuer Name"
  type        = string
  default     = "letsencrypt-cluster-issuer-name"
}

variable "letsencryptSecretName" {
  description = "Letsencrypt Secret Name"
  type        = string
  default     = "letsencrypt-cluster-issuer-secrets"
}

variable "ingressClass" {
  description = "Ingress Class"
  type        = string
  default     = "nginx"
}

variable "ingressName" {
  description = "Ingress Name"
  type        = string
  default     = "ingress-service"
}

variable "sslRedirect" {
  description = "Ssl Redirect"
  type        = bool
  default     = true
}

variable "gitSha" {
  description = "Git SHA"
  type        = string
  default     = "latest"
}
