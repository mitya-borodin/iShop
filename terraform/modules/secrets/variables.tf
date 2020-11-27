variable "project_id" {
  description = "Project ID"
  type        = string
}

variable "secret_id" {
  description = "Secrete ID"
  type        = string
}

variable "secret_data" {
  description = "Secret data map"
  type = any
  default = {
    JWT_SECRET_KEY = "JWT_SECRET_KEY"
    DB_NAME       = "e-commerce-nodejs"
  }
}
