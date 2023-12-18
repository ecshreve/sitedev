---
layout: post
permalink: /overview/lab/
image: assets/images/projects/lab/lab-cur.png
tags: lab devops ansible terraform proxmox docker nomad consul linux
---

I started my homelab with an old desktop and then brought in a Synology NAS, initially focusing on media management and Plex. Since then I've tried all sorts of hardware and software configurations out, and the setup has evolved into a more general-purpose lab.

Nowadays I the lab consists of pretty much my entire home network, and I use it for a variety of things. 

[![Lab Current](/assets/images/projects/lab/lab-cur.png)](/assets/images/projects/lab/lab-cur.png)

## Compute

The lab's main compute resources are two Lenovo Mini PCs.

`coderbox` is running Ubuntu 22.04 and has [Coder](/overview/coder) running as a system service, this is used for most of my development work. I usually create a new workspace for each project I'm working on. Most often I connect to workspaces in Coder via VS Code Remote SSH. Occassionally I'll SSH into `coderbox` directly.

{% include hardware.html hostname = "coderbox" %}

<br>

{% include toolref.html tool = "coder" %}

<br>

`srv-1` is running Proxmox VE, providing a virtualization platform for the lab. It's
running a number of Ubuntu VMs, their resource definitions are mananged via Terraform
and they're provisioned with Ansible. For more information on that part of the lab,
see the [devops](#devops) section below.

{% include hardware.html hostname = "srv-1" %}

<br>

{% include toolref.html tool = "proxmox" %}

## Storage

Two Synology NAS units store most of everything, in addition to handling some
core services used by the lab. Vault is the primary NAS, while Knossus maintains backups and stores logs. Both are connected to a Ubiquiti 24-port switch, which uplinks wirelessly through an AP to a Ubiquiti Dream Router and the internet.

<br/>

`vault` runs a local DNS server and reverse proxy allowing me to use hostnames instead of IPs to access locally hosted applications and machines. It also shares a number of folders via NFS that are mounted elsewhere in the lab.

{% include hardware.html hostname = "vault" %}

{% include hardware.html hostname = "knossus" %}

<br/>

## Network

Currently all wired hosts in lab are connected to a 24 port Ubiquiti switch, which uplinks to a Ubiquiti Dream Router via a Ubuiquiti AP configured as a wireless bridge. A dedicated SSID provides wireless access to the lab's network.

{% include hardware.html hostname = "olympus" %}

{% include hardware.html hostname = "athena" %}

## Devops

[Ansible](/overview/ansible), [Terraform](/overview/terraform), and [Docker](/overview/docker), are the main tools I use when it comes to workload orchestration and configuration automation. I've used them to provision and manage a variety of resources in the lab, including virtual machines, containers, and development environments.

## Monitoring

Metrics and monitoring are some of my favorite things to work on. I've used a variety of tools over the years, and I'm always looking for new ways to visualize and understand the data I collect.

I'm currently using a combination of Prometheus[^prometheus-docs] and Grafana[^grafana-docs] to collect and display metrics from lab. Additionally I'm running Loki[^loki-docs] to collect logs. All three are deployed as jobs in a single node [Nomad](/overview/nomad) cluster.

### Grafana Dashboards

Keeping track of dashboard configurations is something I'm still trying to find the right solution for, but here's a few of the dashboards I have up and running today.

Node Exporter
[![Node Exporter](/assets/images/monitoring/node-exporter.png)](/assets/images/monitoring/node-exporter.png)

<hr>

Nomad Exporter
[![Nomad Exporter](/assets/images/monitoring/nomad-exporter.png)](/assets/images/monitoring/nomad-exporter.png)

<hr>

Loki Logs
[![Loki Logs](/assets/images/monitoring/loki-logs.png)](/assets/images/monitoring/loki-logs.png)

## Appendix

In the past I had two Dell servers that ran mainly LXC containers and are now retired. They were way overpowered for what I was doing with them, but it was fun to have 60 CPU cores and 120 gigs of RAM for awhile.

{% include hardware.html hostname = "apollo" %}

{% include hardware.html hostname = "artemis" %}

<br/>

`vault` was the first piece of hardware I purchased for lab type purposes, and it's been running strong for 4 years. Here's a list of some of the things I've done with it in the past:

- Ran a Plex server
- Ran Docker environment for lab version 1 where I was managing everything in one big docker compose file, and later with docker swarm
- Exported metrics to Prometheus via SNMP and node_exporter
- Ran a VPN server for remote access
- Used official Synology apps to manage backups of local machines, and to sync files between machines, as well as dumping backups to S3 glacier storage
- Ran a local mail server
- Run syslog server for centrally location logs

### Old Diagrams

Diagram of the network that included the two Dell servers.
[![Lab Previous Iteration](/assets/images/projects/lab/lab-old.png)](/assets/images/projects/lab/lab-old.png)

Draft of the network that included a cluster of raspberry pis.
[![Lab Previous Iteration](/assets/images/projects/lab/lab-old1.png)](/assets/images/projects/lab/lab-old1.png)

{% include refs.md %}
