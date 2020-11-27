locals {
  secrete_id = "${var.prefix}-env-${var.postfix}"
}

module "secrets" {
  source = "../secrets"

  project_id = var.project_id
  secret_id  = local.secrete_id

  secret_data = var.secret_data
}

resource "helm_release" "application" {
  depends_on = [module.secrets]

  name       = var.name
  repository = null
  chart      = "${path.module}/helm"

  version = "1.0.0"

  max_history = 5
  wait        = true

  values = [
    yamlencode({
      secrete_id = local.secrete_id
      domain = var.domain
      email = var.email
      letsencryptServer = var.letsencryptServer
      clusterIssuerName = var.clusterIssuerName
      letsencryptSecretName = var.letsencryptSecretName
      ingressClass = var.ingressClass
      ingressName = var.ingressName
      sslRedirect = var.sslRedirect
      gitSha = var.gitSha
      env = module.secrets.secret_data
    })
  ]
}
