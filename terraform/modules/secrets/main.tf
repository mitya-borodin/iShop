resource "google_secret_manager_secret" "secret_basic" {
  project   = var.project_id
  secret_id = var.secret_id

  replication {
    automatic = true
  }
}

data "google_client_openid_userinfo" "me" {
}

resource "google_secret_manager_secret_iam_member" "member" {
  depends_on = [google_secret_manager_secret.secret_basic]
  project    = google_secret_manager_secret.secret_basic.project
  secret_id  = google_secret_manager_secret.secret_basic.secret_id
  role       = "roles/secretmanager.admin"
  member     = "serviceAccount:${data.google_client_openid_userinfo.me.email}"
}

resource "google_secret_manager_secret_version" "secret-version-basic" {
  depends_on = [google_secret_manager_secret.secret_basic, google_secret_manager_secret_iam_member.member]

  secret      = google_secret_manager_secret.secret_basic.id
  secret_data = jsonencode(var.secret_data)
}
