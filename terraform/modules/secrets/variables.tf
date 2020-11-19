variable "project_id" {
  description = "Project ID"
  type        = string
}

variable "secret_id" {
  description = "Secrete ID"
  type        = string
}

variable "secret_data" {
  description = "Secret data"
  type = object({
    jwtSecretKey = string
    dbName       = string
  })
  default = {
    jwtSecretKey = "jwtSecretKey"
    dbName       = "e-commerce-nodejs"
  }
}
