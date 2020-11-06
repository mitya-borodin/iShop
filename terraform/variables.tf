variable "project" {}

variable "region" {
  default = "asia-east1"
}

variable "zone" {
  default = "asia-east1-a"
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
  default     = 2
  description = "number of gke nodes"
}

variable "machine_type" {
  default = "e2-standard-2"
}
