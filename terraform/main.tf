locals {
  name = var.name != "" ? var.name : var.project
}

module "apis" {
  source = "./modules/apis"

  project = var.project
}

module "kube" {
  source = "./modules/kube"

  depends_on = [module.apis]

  name         = local.name
  zone         = var.zone
  machine_type = var.kube.machine_type
  machines     = var.kube.machines
}

module "kubectl" {
  source = "./modules/kubectl"

  cluster_ca_certificate = module.kube.cluster_ca_certificate
  client_certificate     = module.kube.client_certificate
  client_key             = module.kube.client_key
  endpoint               = module.kube.endpoint
}

resource "helm_release" "ingress-nginx" {
  depends_on = [module.kube]

  name       = "e-commerce-nodejs-ingress-nginx"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  version    = "3.8.0"
}

resource "helm_release" "cert-manager" {
  depends_on = [module.kube]

  name             = "e-commerce-nodejs-cert-manager"
  repository       = "https://charts.jetstack.io"
  chart            = "cert-manager"
  version          = "1.0.4"
  create_namespace = true
  namespace        = "cert-manager"

  max_history = 5
  wait        = true

  set {
    name  = "installCRDs"
    value = true
  }
}
