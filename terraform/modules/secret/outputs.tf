data "google_secret_manager_secret_version" "get" {
  depends_on = [google_secret_manager_secret_version.set]

  secret = google_secret_manager_secret.this.id
}

output "secret_name" {
  value = data.google_secret_manager_secret_version.get.name
}

output "secret_enabled" {
  value = data.google_secret_manager_secret_version.get.enabled
}

output "secret_data" {
  value = jsondecode(data.google_secret_manager_secret_version.get.secret_data)
}
