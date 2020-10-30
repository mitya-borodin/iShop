variable "project" { }

variable "credentials_file" { }

variable "region" {
  default = "us-central1"
}

variable "zone" {
  default = "us-central1-c"
}

variable "gke_num_nodes" {
  default     = 2
  description = "number of gke nodes"
}
