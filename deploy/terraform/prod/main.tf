locals {
  ssh_key = file(var.deploy_ssh_key)
  group   = "webserver"

  cloudinit_configs = [
    { type = "text/cloud-config",
      content = templatefile(
        "yc-meta.yaml.tmpl",
        { user = var.deploy_user, ssh_key = local.ssh_key }
      )
    }
  ]

  ssh_permited_hosts = concat(
    flatten([for i in module.vpc.subnets : i.v4_cidr_blocks]),
    var.deploy_hosts
  )
}

data "cloudinit_config" "configs" {
  gzip          = false
  base64_encode = false

  dynamic "part" {
    for_each = local.cloudinit_configs

    iterator = config
    content {
      content_type = config.value.type
      content      = config.value.content
    }
  }
}

resource "yandex_dns_zone" "saigo_info" {
  zone   = var.fqdn
  public = true
}

resource "yandex_dns_recordset" "a_record_saigo_info" {
  name    = var.fqdn
  zone_id = yandex_dns_zone.saigo_info.id
  type    = "A"
  ttl     = 180
  data    = [yandex_vpc_address.public.external_ipv4_address[0].address]
}

resource "yandex_dns_recordset" "cname_record_www_saigo_info" {
  name    = "www.${var.fqdn}"
  zone_id = yandex_dns_zone.saigo_info.id
  type    = "CNAME"
  ttl     = 180
  data    = [yandex_dns_recordset.a_record_saigo_info.name]
}

module "vpc" {
  source = "github.com/iganosaigo/terraform-yandex-vpc.git?ref=main"
  name   = "${var.env}-vpc"
  labels = {
    env = var.env
  }
  enable_nat_global = true
  subnets = {
    subnet-a = { zone = "ru-central1-a", cidr_blocks = ["10.1.0.0/24"], nat = true },
    subnet-b = { zone = "ru-central1-b", cidr_blocks = ["10.2.0.0/24"] },
  }
}

module "sg" {
  source     = "github.com/iganosaigo/terraform-yandex-security-group.git?ref=main"
  name       = "${var.env}-security_group"
  network_id = module.vpc.network.id

  rules = [
    {
      direction      = "egress"
      protocol       = "ANY"
      description    = "From me to any"
      v4_cidr_blocks = ["0.0.0.0/0"]
      from_port      = 0
      to_port        = 65535
    },
    {
      direction      = "ingress"
      protocol       = "TCP"
      description    = "HTTP from any"
      v4_cidr_blocks = ["0.0.0.0/0"]
      port           = 80
    },
    {
      direction      = "ingress"
      protocol       = "TCP"
      description    = "HTTPS from any"
      v4_cidr_blocks = ["0.0.0.0/0"]
      port           = 443
    },
    {
      direction      = "ingress"
      protocol       = "TCP"
      description    = "SSH from internal ${var.env} networks"
      v4_cidr_blocks = local.ssh_permited_hosts
      port           = 22
    },
    {
      direction      = "ingress"
      protocol       = "TCP"
      description    = "k3s from internal ${var.env} networks"
      v4_cidr_blocks = local.ssh_permited_hosts
      port           = 6443
    }
  ]

}

resource "yandex_vpc_address" "public" {
  name = "app-address"

  external_ipv4_address {
    zone_id = module.vpc.subnets.subnet-a.zone
  }
}

module "compute" {
  source             = "github.com/iganosaigo/terraform-yandex-compute-instance.git?ref=main"
  name               = "web01"
  hostname           = "web01"
  subnet_id          = module.vpc.subnets.subnet-a.id
  zone               = module.vpc.subnets.subnet-a.zone
  enable_nat         = true
  nat_ip_address     = yandex_vpc_address.public.external_ipv4_address[0].address
  security_group_ids = [module.sg.security_group.id]
  labels = {
    env   = var.env
    group = "webserver"
  }

  boot_disk_initialize_params = {
    size = 20
  }

  serial_port_enable = true
  user_data          = data.cloudinit_config.configs.rendered

  cores         = 2
  memory        = 2
  core_fraction = 20
}

