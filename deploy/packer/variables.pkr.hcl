variable "cloud_spec" {
  type        = list(object({
    folder_id = string,
    subnet_id = string,
    zone      = string,
  }))
  description = "YC clud settings with folder and network"
}

variable "image_family" {
  type        = string
  description = "YC Image Family"
}

variable "ssh_username" {
  type        = string
  description = "YC Image Initial Username"
}

variable "image_name" {
  type        = string
  description = "YC Name For New Image"
}

variable "image_descr" {
  type        = string
  description = "YC Image Description"
}

variable "disk_type" {
  type        = string
  description = "YC Disk Type"
}
