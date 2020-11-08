locals {
  init_kubectl_script_path = "${path.module}/kubectl.tpl.sh"
  kubectl_config = {
    cluster_ca_certificate = var.cluster_ca_certificate
    client_certificate     = var.client_certificate
    client_key             = var.client_key
    endpoint               = var.endpoint
  }
}

resource "null_resource" "init_kubectl" {
  triggers = merge(local.kubectl_config, {
    script_hash = filemd5(local.init_kubectl_script_path)
  })

  provisioner "local-exec" {
    command = templatefile(local.init_kubectl_script_path, local.kubectl_config)
  }
}
