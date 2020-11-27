variable "project_id" {
  description = "Project ID"
  type        = string
}

variable "zone" {
  description = "Zone to create resources in (must be located within 'region' variable)"
  type        = string
  default     = "us-east1-d"
}

variable "credentials_file" {
  description = "Service Account credentials for google"
  type        = string
  default     = "../credentials/account.json"
}

variable "kube" {
  description = "Kubernetes cluster configuration. Machine type and the amount of machines to create."
  type = object({
    machine_type = string
    machines     = number
  })
  default = {
    machine_type = "n1-standard-4"
    machines     = 1
  }
}

variable "secret_data" {
  description = "Secret data"
  type = any
  default = {
    JWT_SECRET_KEY = "JWT_SECRET_KEY"
    DB_NAME       = "e-commerce-nodejs"
  }
}
