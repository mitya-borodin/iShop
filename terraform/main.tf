module "apis" {
  source = "./modules/apis"

  project_id = var.project_id
}

module "kube" {
  source = "./modules/kube"

  depends_on = [module.apis]

  name         = var.project_id
  zone         = var.zone
  machine_type = var.kube.machine_type
  machines     = var.kube.machines
}

module "kubectl" {
  source = "./modules/kubectl"

  depends_on = [module.kube]

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

module "app" {
  source = "./modules/app"

  depends_on = [helm_release.ingress-nginx, helm_release.cert-manager]
  
  project_id = var.project_id

  prefix = "e-commerce-nodejs"
  postfix = "prod"
  secret_data = var.secret_data
}
