locals {
  secrete_id = "${var.prefix}-env-${var.postfix}"
}

module "secret" {
  source = "../secret"

  project_id = var.project_id
  secret_id  = local.secrete_id

  secret_data = var.secret_data
}

resource "helm_release" "application" {
  depends_on = [module.secret]

  name       = var.name
  repository = null
  chart      = "${path.module}/helm"

  version = "1.0.0"

  max_history = 5
  wait        = true

  set {
    name  = "secrete_id"
    value = local.secrete_id
  }

  set {
    name  = "domain"
    value = var.domain
  }

  set {
    name  = "email"
    value = var.email
  }

  set {
    name  = "letsencryptServer"
    value = var.letsencryptServer
  }

  set {
    name  = "clusterIssuerName"
    value = var.clusterIssuerName
  }

  set {
    name  = "letsencryptSecretName"
    value = var.letsencryptSecretName
  }

  set {
    name  = "ingressClass"
    value = var.ingressClass
  }

  set {
    name  = "ingressName"
    value = var.ingressName
  }

  set {
    name  = "sslRedirect"
    value = var.sslRedirect
  }

  set {
    name  = "gitSha"
    value = var.gitSha
  }

  values = [
    yamlencode({ env = module.secret.secret_data })
  ]
}
