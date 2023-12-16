---
layout: post
title: Monitoring
tags: monitoring tools devops lab grafana prometheus promtail loki
---

Metrics and monitoring are some of my favorite things to work on. I've used a variety of tools over the years, and I'm always looking for new ways to visualize and understand the data I collect.

## Current Setup

I'm currently using a combination of [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/) to collect and display metrics from my homelab. Additionally I'm running [Promtail](https://grafana.com/docs/loki/latest/send-data/promtail/) and [Loki](https://grafana.com/docs/loki/latest/) to collect logs. All are running as [Nomad](https://developer.hashicorp.com/nomad/docs) jobs on my [homelab cluster](/overview/homelab/).


### What I'm Monitoring

The most crucial piece of my homelab is the Synology NAS that runs a variety of services, notably a DNS server that provides resolution for the `slab.lan` domain, and a reverse proxy that routes some web application traffic to the appropriate service. I monitor the NAS with a combination of the [Node Exporter](https://synocommunity.com/package/node-exporter) and some of Synology's builtin scheduled tasks and email reports.

The other Synology NAS in my homelab is used for storage and backups, it's also running the Node Exporter and some builtin scheduled tasks and email reports.

I'm also monitoring the [Nomad](https://www.nomadproject.io/) cluster that runs my homelab. I'm using the [Nomad Exporter]() to collect metrics from the Nomad cluster, and I'm using the [Consul Exporter]() to collect metrics from the Consul cluster that Nomad uses for service discovery.

As far as Loki logs go, I'm only collecting from the Nomad cluster at the moment. And usually just use the Grafana Explore feature to search the Loki datasource for logs.

I use the [Ubiquiti Network App]() to monitor my home network, and I use some of the builtin reports and alerts to track general health of the network.

### Grafana Dashboards

Keeping track of dashboard configuration is something I'm still trying to find the right solution for, but here's a few of the dashboards I'm using today.

Node Exporter
[![Node Exporter](/assets/images/monitoring/node-exporter.png)](/assets/images/monitoring/node-exporter.png)

<hr>

Nomad Exporter
[![Nomad Exporter](/assets/images/monitoring/nomad-exporter.png)](/assets/images/monitoring/nomad-exporter.png)

<hr>

Loki Logs
[![Loki Logs](/assets/images/monitoring/loki-logs.png)](/assets/images/monitoring/loki-logs.png)