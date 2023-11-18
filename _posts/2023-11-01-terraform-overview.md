---
layout: post
title: Terraform Overview
category: overview
tags: terraform devops lab
---

{% include tool-title.html tool = "Terraform" %}

Currently used to create virtual machines in Proxmox. Maintain a custom module to 
abstract most default configuration out.[^terraform-docs]

Most common arguments are abstracted out to a child module in the [slab](https://github.com/ecshreve/slab) 
project. Default values get set there. In the past I've maintained this module in a private Terraform 
registry, but that was cumbersome to maintain and harder to document and reason about.

Today for example, to create a new VM with 8GB of ram and 8 CPU cores, I would add this
block to my `main.tf` file.

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
