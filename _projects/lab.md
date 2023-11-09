---
layout: page
title: home lab
desc: "My home lab"
image: /images/lab-old.png
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