packer {
  required_plugins {
    yandex = {
      version = ">= 1.1.2"
      source  = "github.com/hashicorp/yandex"
    }
  }
}

locals {
  suffix     = formatdate("YYYYMMDDhhmmss", timestamp())
  image_name = "${var.image_name}-${local.suffix}"
}

source "yandex" "almalinux8_custom_image" {
  service_account_key_file = "../key.json"
  source_image_family      = var.image_family
  ssh_username             = var.ssh_username
  use_ipv4_nat             = "true"
  image_description        = var.image_descr
  image_family             = var.image_family
  image_name               = local.image_name
  disk_type = var.disk_type
}

build {
  sources = ["source.yandex.almalinux8_custom_image"]

  dynamic "source" {
    for_each = var.cloud_spec

    iterator = network
    labels   = ["source.yandex.almalinux8_custom_image"]
    content {
      folder_id = network.value.folder_id
      subnet_id = network.value.subnet_id
      zone = network.value.zone
    }
  }

  provisioner "ansible" {
    playbook_file = "ansible/playbook.yaml"
    galaxy_file = "ansible/requirements.yaml"
    roles_path = "ansible/roles"
  }
}

