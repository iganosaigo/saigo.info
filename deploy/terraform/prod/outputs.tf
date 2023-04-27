# output "instance" {
#   value = module.compute.compute_instance
# }

output "instance_public_address" {
  value = yandex_vpc_address.public.external_ipv4_address[0].address
}


output "ansible_inventory" {
  value = {
    "${var.env}-${module.compute.compute_instance.labels.group}" = {
      hosts = [trimsuffix(var.fqdn, ".")],
      vars = {
        ansible_host = yandex_vpc_address.public.external_ipv4_address[0].address
      }
    }
  }
}

output "ansible_user" {
  value = var.deploy_user
}
