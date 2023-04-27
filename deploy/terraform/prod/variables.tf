variable "env" {
  description = "Environment"
  type        = string
}

variable "fqdn" {
  description = "FQDN for site"
  type        = string
}

variable "cloud_id" {
  description = "Cloud ID"
  type        = string
}

variable "folder_id" {
  description = "Folder ID"
  type        = string
}

variable "deploy_hosts" {
  description = "IP addresses of deploy hosts"
  type        = list(string)
  default     = null
}

variable "deploy_user" {
  description = "Deployt username"
  type        = string
  default     = "ansible"

}

variable "deploy_ssh_key" {
  description = "Deploy pub ssh_key path"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}
