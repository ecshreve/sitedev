---
layout: page
title: home lab
desc: "My home lab"
image: /images/lab-hashi.png
rank: 1
tags: lab devops ansible terraform proxmox docker nomad consul linux
---

# Home Lab

- many iterations
- started with old desktop, then added Synology NAS 
- initially the whole lab was centered around media management and Plex, but it's evolved into a more general purpose lab

## Network

Currently all wired hosts in lab are connected to a 24 port Ubiquiti switch, which uplinks to a 
Ubiquiti Dream Router via a Ubuiquiti AP configured as a wireless bridge. A dedicated SSID provides
wireless access to the lab's network.

{% include hardware.html 
  hostname = "olympus"
  model = "Ubiquiti Dream Router"
  os = "Ubiquiti Dream Router OS"
  cpu = "4 x 1.7GHz"
  mem = "2GB"
  hd = "N/A"
%}

{% include hardware.html 
  hostname = "athena"
  model = "Ubiquiti 24 Port Switch"
  os = "Ubiquiti Switch OS"
%}

## Servers // Compute

### Current State

The lab's main compute resources are two Lenovo Mini PCs, `srv-1` running Proxmox VE, and
`coderbox` running Ubuntu 22.04. Coderbox is running Coder[^coder-docs] as a system service, 
and is used for most of my day today development. 

{% include hardware.html 
  hostname = "coderbox"
  model = "Lenovo M900"
  os = "Ubuntu 22.04"
  cpu = "4 x Intel(R) Core(TM) i5-6600 CPU @ 3.30GHz (1 Socket)"
  mem = "16GB"
  hd = "1 x 256GB"
%}

Srv-1 is running Proxmox VE, providing a virtualization platform for the lab. It's
running a number of Ubuntu VMs, their resource definitions are mananged via Terraform
and they're provisioned with Ansible. For more information on that part of the lab,
see the [devops](#devops) section below.

{% include hardware.html 
  hostname = "srv-1"
  model = "Lenovo M900"
  os = "Proxmox VE 8.0.3"
  cpu = "4 x Intel(R) Core(TM) i5-6600 CPU @ 3.30GHz (1 Socket)"
  mem = "16GB"
  hd = "1 x 256GB"
%}

### Previous Iterations

These two Dell servers ran mainly LXC containers and are now retired. They were
way overpowered for what I was doing with them, but I got them for a good price
and it was fun to have 60 CPU cores and 120 gigs of RAM for awhile.

{% include hardware.html 
  hostname = "Apollo"
  model = "Dell R620"
  os = "Proxmox VE 7.2-11"
  cpu = "32 x Intel(R) Xeon(R) CPU E5-2660 0 @ 2.20GHz (2 Sockets)"
  mem = "64GB"
  hd = "8 x 600GB"
%}

{% include hardware.html 
  hostname = "Artemis"
  model = "Dell R620"
  os = "Proxmox VE 7.2-11"
  cpu = "32 x Intel(R) Xeon(R) CPU E5-2670 0 @ 2.60GHz (2 Sockets)"
  mem = "64GB"
  hd = "10 x 800GB"
%}

---

## Storage

### Current State 

Two Synology NAS units store most of everything, in addition to handling some
core services used by the lab. Vault is the primary NAS, while Knossus maintains backups and stores logs. Both are connected to a Ubiquiti 24-port switch, which uplinks wirelessly to a Ubiquiti Dream Router and the internet.

Vault runs a local DNS server allowing me to use hostnames instead of IPs to access locally hosted applications and machines. It also shares a number of folders via NFS that are mounted elsewhere in the lab.


{% include hardware.html 
  hostname = "Vault"
  model = "Synology DS920+ w/ Expansion"
  os = "DSM 7"
  cpu = "4 x INTEL Celeron J4125 @ 2GHz"
  mem = "8GB"
  hd = "10.5TB - 4 x 4TB @ RAID5 w/ 1TB SSD Cache"
  hd2 = "14TB   - 5 x 4TB @ RAID5 w/ 1TB SSD Cache"
%}

{% include hardware.html 
  hostname = "Knossus"
  model = "Synology RS422+"
  os = "DSM 7"
  cpu = "2 x AMD Ryzen R1600 @ 2.60GHz"
  mem = "2GB"
  hd = "31.4TB - 4 x 12TB @ HYBRID(SHR)"
%}

### History

Vault was the first piece of hardware I purchased for the lab, and it's been
running strong for 4 years. Here's a list of some of the things I've done with
it in the past:
- Ran a Plex server
- Ran Docker environment for lab version 1 where I was managing everything in one big docker compose file, and later with docker swarm
- Exported metrics to Prometheus via SNMP and node_exporter
- Ran a VPN server for remote access
- Used official Synology apps to manage backups of local machines, and to sync files between machines, as well as dumping backups to S3 glacier storage
- Ran a local mail server