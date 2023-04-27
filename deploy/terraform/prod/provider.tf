terraform {
  required_providers {
    yandex = {
      source  = "yandex-cloud/yandex"
      version = "~> 0.84.0"
    }
    cloudinit = {
      source  = "hashicorp/cloudinit"
      version = "~> 2.2.0"
    }
    local = {
      source  = "hashicorp/local"
      version = "~> 2.3.0"
    }
  }
  required_version = ">= 1.3"

  backend "s3" {
    endpoint                    = "storage.yandexcloud.net"
    skip_region_validation      = true
    skip_credentials_validation = true
  }

}

provider "yandex" {
  service_account_key_file = "../../key.json"
  cloud_id                 = var.cloud_id
  folder_id                = var.folder_id
  #zone                     = var.zone
}
