variable "project" {}

variable "region" {
  default = "us-central1"
}

variable "zone" {
  default = "us-central1-c"
}

variable "credentials_file" {}

variable "cluster_name" {
  default     = "default"
  description = "number of gke cluster"
}

variable "cluster_node_pool_name" {
  default     = "default"
  description = "name of gke nodes pool"
}

variable "machines" {
  default     = 1
  description = "number of gke nodes"
}

variable "machine_type" {
  default = "e2-micro"
}
