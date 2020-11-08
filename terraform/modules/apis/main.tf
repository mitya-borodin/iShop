// Enable Cloud Resource Manager API on a fresh project
// (required for doing the destroy)
resource "google_project_service" "cloudresourcemanager" {
  project = var.project
  service = "cloudresourcemanager.googleapis.com"

  disable_on_destroy = false
}

// Enable Compute Engine API on a fresh project
resource "google_project_service" "compute" {
  project = var.project
  service = "compute.googleapis.com"

  disable_on_destroy = false
}

data "google_project" "this" {
  project_id = var.project
}

// Enable Container API on a fresh project
resource "google_project_service" "container" {
  project = var.project
  service = "container.googleapis.com"

  disable_on_destroy = false
}

// Enable Cloud Build
resource "google_project_service" "cloudbuild" {
  project = var.project
  service = "cloudbuild.googleapis.com"

  disable_on_destroy = false
}

// Add Project Editor role to the Cloud Build service account
// (required to be able to work with Kube and with any other project resources)
resource "google_project_iam_member" "cloudbuild_sa_editor" {
  depends_on = [google_project_service.cloudbuild]

  project = var.project
  role    = "roles/editor"
  member  = "serviceAccount:${data.google_project.this.number}@cloudbuild.gserviceaccount.com"
}
