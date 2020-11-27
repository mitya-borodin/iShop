data "google_secret_manager_secret_version" "basic" {
  depends_on = [google_secret_manager_secret.secret_basic, google_secret_manager_secret_iam_member.member]
  secret     = var.secret_id
  project    = var.project_id
}

output "secret_data" {
  value = jsondecode(data.google_secret_manager_secret_version.basic.secret_data)
}

output "secret_name" {
  value = data.google_secret_manager_secret_version.basic.name
}

output "secret_enabled" {
  value = data.google_secret_manager_secret_version.basic.enabled
}
