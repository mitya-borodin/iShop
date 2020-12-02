resource "google_secret_manager_secret" "this" {
  project   = var.project_id
  secret_id = var.secret_id

  replication {
    automatic = true
  }
}

data "google_client_openid_userinfo" "me" {
}

resource "google_secret_manager_secret_iam_member" "this" {
  depends_on = [google_secret_manager_secret.this]

  project   = google_secret_manager_secret.this.project
  secret_id = google_secret_manager_secret.this.secret_id
  role      = "roles/secretmanager.admin"
  member    = "serviceAccount:${data.google_client_openid_userinfo.me.email}"
}

resource "google_secret_manager_secret_version" "set" {
  depends_on = [google_secret_manager_secret_iam_member.this]

  secret      = google_secret_manager_secret.this.id
  enabled     = true
  secret_data = jsonencode(var.secret_data)
}
