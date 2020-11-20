resource "helm_release" "application" {
  name       = var.name
  repository = null
  chart      = "${path.module}/helm"

  version = "1.0.0"

  max_history = 5
  wait        = true

  set {
    name  = "JWT_SECRET_KEY"
    value = uuid()
  }
  
  set {
    name  = "DB_NAME"
    value = var.dbName
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
}
