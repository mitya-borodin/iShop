variable "name" {
  description = "Environment name"
  type        = string
}

variable "zone" {
  description = "Zone to create Kubernetes cluster in"
  type        = string
}

variable "machine_type" {
  description = "Type of the google vm to create."
  type        = string
  default     = "n1-standard-4"
}

variable "machines" {
  description = "Size of the Kubernetes cluster (how many nodes to create)."
  type        = number
  default     = 1
}
