---
layout: post
title: Terraform
category: overview
permalink: /overview/terraform/
img: '<svg class="svg-icon" id="tf" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 210"><polygon class="cls-1" points="102.58 46.91 141.41 69.33 141.41 114.16 102.58 91.75 102.58 46.91"/><polygon class="cls-1" points="145.67 69.33 145.67 114.16 184.5 91.75 184.5 46.91 145.67 69.33"/><polygon class="cls-1" points="59.5 21.88 59.5 66.72 98.33 89.14 98.33 44.3 59.5 21.88"/><polygon class="cls-1" points="102.58 141.49 141.41 163.91 141.41 119.38 141.41 119.08 102.58 96.66 102.58 141.49"/></svg>'
tags: terraform devops lab coder proxmox
---

Used to manage infrastructure and development environments in my homelab.

## Details

### Proxmox

Currently used to create virtual machines in Proxmox. Maintain a custom module to abstract most default configuration out.[^terraform-docs]

Most common arguments are abstracted out to a child module in the [slab](https://github.com/ecshreve/slab) project. Default values get set there. In the past I've maintained this module in a private Terraform registry, but that was cumbersome to maintain and harder to document and reason about.

Today for example, to create a new virtual machine with 8GB of ram and 8 CPU cores, I would add this block to my `main.tf` file.

```terraform
module "ubuvm" {
  count  = 1
  source = "./modules/ubuntu-vm"

  name            = "newdevbox"
  vmid            = 120
  cores           = 8
  mem             = 8196
  ip_address      = "10.1.100.100"
}
```

### Coder

I've also used Terraform to create templates in Coder. For more information on Coder, see the [Coder Overview]({% link overview/coder %}) page.

## Reference

>Terraform is an infrastructure as code tool that lets you build, change, and version infrastructure safely and efficiently. This includes low-level components like compute instances, storage, and networking; and high-level components like DNS entries and SaaS features.

- [Terraform Home](https://terraform.io)
- [Terraform Docs](https://www.terraform.io/docs/index.html)

{% include refs.md %}