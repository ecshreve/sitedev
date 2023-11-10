---
layout: page
title: cluster
---

{% include tool-title.html tool = "Consul" %}

Provides central service registry, health checks, and DNS lookups for nodes
and services. Makes clustering nomad agents more straightforward.[^consul-docs]
Not strictly that helpful becuase right now I'm only running a single node
cluster, but more helpful when I was running 5 or 6 nodes

{% include tool-title.html tool = "Nomad" %}

Orchestrate deploying services and tasks by executing nomad job specs. Most of
the services I've deployed are Docker workloads, though I do have one cron job
running as a Nomad batch job as well.[^nomad-docs]

I use a Golang package I wrote and still tinker with to generate job specs from a
type definition, and then deploy them with a Taskfile target.

Previously managed deploying and managing the cluster with a combination of terraform, 
shell scripts, levant templating, bespoke code generation, Makefiles, and a Gitlab CI Pipeline 
on a locally hosted Gitlab instance. Things are much smoother now that everything 
is in one place (more or less).


