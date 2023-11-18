---
layout: post
title:  Ansible Overview
category: overview
tags: ansible devops lab
---

Primarily, I use Ansible in my lab to provision virtual machines running Ubuntu, which are deployed to Proxmox via Terraform separately.

To facilitate this setup, I manage a variety of custom roles. These roles are responsible for handling distinct aspects of the configuration. Alongside these roles, I maintain several playbooks. Each playbook is designed to execute specific roles on designated targets.

To illustrate, if I need to provision a new cluster of virtual machines, I can execute a concise playbook. However, this would require minor adjustments to the IP address values within some of the role files.

This playbook would result in any hosts in the `servers`, and `workers` groups
being provisioned with the `hashi`, `consul`, `nomad`, and `docker` roles. (ie 
installing the Hashicorp repository, install and configure Consul and Nomad, and finally install Docker).

```yml
---
- name: Setup cluster
  hosts:
    - servers
    - workers
  roles:
    - hashi
    - consul
    - nomad
    - docker
  tags:
    - setup
```

{% include refs.md %}