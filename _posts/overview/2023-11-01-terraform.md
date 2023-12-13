---
layout: post
title: Terraform Overview
permalink: /overview/terraform/
tags: terraform overview devops lab coder proxmox
---

{{ site.data.tooldef.terraform.brief }}
{{ site.data.tooldef.terraform.work }}

## Summary

>Terraform is an infrastructure as code tool that lets you build, change, and version infrastructure safely and efficiently. This includes low-level components like compute instances, storage, and networking; and high-level components like DNS entries and SaaS features.[^tf-home]

I use Terraform[^tf-docs] to manage infrastructure and development environments in my homelab. I've used a variety of providers, primarily proxmox[^proxmox-tf], docker[^docker-tf], and coder[^coder-tf].

## Details

### Proxmox

One of the main tasks I solve with Terraform is managing virtual machines in Proxmox.

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

>Coder is an open-source platform for creating and managing developer workspaces on your preferred clouds and servers.[^coder-home]

Coder templates are created and edited as Terraform files, and templates define the environment and resources for a workspace. For more information on my Coder setup, see the [Coder Overview](/overview/coder/).

## Memorable Challenges 

- Manage state in Terraform Cloud.
- Manage Plan/Apply workflow in Terraform Cloud.
- Use as a step in Gitlab and Jenkins pipelines.
- Orchestrate Docker containers on a variety of hosts.
- Migrating from a locally managed state to using a remote backend in Terraform Cloud.
- Borking my workflow by upgrading to a new version of the Proxmox provider that was incompatible with my current version of Terraform.
- Manually copying and pasting resource definitions into / out of state files.

<hr>

{% include refs.md %}