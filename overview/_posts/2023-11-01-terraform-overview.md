---
layout: post
tags: terraform devops lab coder proxmox
permalink: /overview/terraform
---

{% include toolref.html tool="terraform" %}

I use Terraform to manage infrastructure and development environments in my homelab. I've used a variety of providers, primarily proxmox[^proxmox-tf], docker[^docker-tf], and coder[^coder-tf].

## Proxmox

One of the main tasks I solve with Terraform is creation and desctruction of virtual machines in Proxmox.

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

## Memorable Challenges 

- Manage state in Terraform Cloud.
- Manage Plan/Apply workflow in Terraform Cloud.
- Use as a step in Gitlab and Jenkins pipelines.
- Orchestrate Docker containers on a variety of hosts.
- Migrating from a locally managed state to using a remote backend in Terraform Cloud.
- Borking my workflow by upgrading to a new version of the Proxmox provider that was incompatible with my current version of Terraform.
- Manually copying and pasting resource definitions into / out of state files.

{% include refs.md %}