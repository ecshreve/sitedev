---
layout: page
title: terraform
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

## ansible

Mainly used to provision virtual machines in the cluster running Ubuntu, also
used for various bespoke tasks like popoulating a private docker registry, and
configuring uptime-kuma monitors.

In the past I've also used a playbook in my [dotfile setup](https://github.com/ecshreve/figgy) 
rather than a shell script. I've also used Ansible to configure my Docker images
built with Packer.

## coder

Base images maintained in public docker repo, based on Dockerfiles found throughout
the Coder documentation and related projects.

At this time the `coderall-tmpl` is the Coder template I use for new workspaces. It's
based on the `ecshreve/coderall:eric` image. Which yieds a Ubuntu 22.04 based workspace
with varioud development tools and settings pre-configured.

