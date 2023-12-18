---
layout: post
tags: coder devops lab docker terraform
permalink: /overview/coder
---

{% include toolref.html tool="coder" %}

## Summary 

A number of factors led me to Coder, at the end of the day it aligns with my needs and curiosities as a software engineer. The documentation is solid, the interface is attractive, and the product works. I found it to be the ideal solution for managing development environments for my personal projects. On another note, while there is an Enterprise version of Coder, the open source version is free to use and I've yet to run into any limitations that would be solved with a credit card.

The workspaces I currently have in Coder are:

- `sitedev`: a workspace for developing this website, which is built with Jekyll
- `blank`: a workspace with no additional configuration, just nice to have a linux environment ready to go
- `dndenv`: a workspace for the DnD API I contribute to, which is built with Node.js and MongoDB
- `dotfiles`: a workspace for managing and experimenting with my dotfiles and personal configuration
- `run`: a workspace for developing the run project[^run-repo] which is built with Go and to which I've made a couple small contributions
- `slab`: a workspace for working with the slab is a project, encompassing configuration files and scripts for the setup of my homelab and personal development environment
- `slomad`: a workspace for working with the slomad project, which is a custom Go module I use to interact with the Nomad API and deploy jobs to the Nomad cluster in my homelab
- `switchbotapi`: interacts with the SwitchBot API, to pull data from various sensors around my house, and push that data to a MySQL database running in the cluster


<br>

[![Coder Workspaces](/assets/images/coder-workspace.png)](/assets/images/coder-workspace.png)

<br>

My Coder configuration files live in the slab repository[^slab-repo] in the `/coder` directory. 
At this time the Coder template I use for new workspaces is named `coderall-tmpl`. It's based on the `ecshreve/coderall:eric` Docker image and yields a workspace running Ubuntu 22.04 with most of my usual development tools and settings already taken care of, including a properly configured user named `eric`. 

## Memorable Challenges

- configuring a Coder template to create workspaces in virtual machines on a Proxmox host
- attempting to spin up a local certificate authority to provide TLS certificate for the coder host
- there's a small behavior where my ruby installation isn't persisting between workspace boots, but that's a minor annoyance
- when I first started using Coder, I already had a Ubuntu VM in my lab named "coderbox" that I would create and destroy regularly for a fresh environment, and that name caused a bit of confusion
- and many more...

### Appendix

### Building the coderall Docker Image

The `coderall` image is built from this Dockerfile in the `slab` repository:

```docker
FROM ubuntu:22.04

SHELL ["/bin/bash", "-c"]

# Install the Docker apt repository
RUN apt-get update && \
    DEBIAN_FRONTEND="noninteractive" apt-get upgrade --yes && \
    DEBIAN_FRONTEND="noninteractive" apt-get install --yes ca-certificates
COPY docker-archive-keyring.gpg /usr/share/keyrings/docker-archive-keyring.gpg
COPY docker.list /etc/apt/sources.list.d/docker.list

# Install base packages
RUN apt-get update && \
    DEBIAN_FRONTEND="noninteractive" apt-get install --yes \
      bash \
      build-essential \
      containerd.io \
      curl \
      docker-ce \
      docker-ce-cli \
      docker-compose-plugin \
      htop \
      locales \
      man \
      python3 \
      python3-pip \
      software-properties-common \
      sudo \
      systemd \
      systemd-sysv \
      unzip \
      vim \
      wget \
      rsync && \
    # Install latest Git using their official PPA
    add-apt-repository ppa:git-core/ppa && \
    DEBIAN_FRONTEND="noninteractive" apt-get install --yes git

# Enables Docker starting with systemd
RUN systemctl enable docker

# Add docker-compose
RUN curl -L "https://github.com/docker/compose/releases/download/v2.16.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose

# Make typing unicode characters in the terminal work.
ENV LANG en_US.UTF-8

# cli tools
RUN apt-get update && apt-get install -y \
	apt-utils \
	bat \
	exa \
	fd-find \
	fzf \
	htop \
	net-tools \
	prettyping \
	ripgrep \
	&& rm -rf /var/lib/apt/lists/*

RUN ln -s /usr/bin/batcat /usr/bin/bat \
	&& ln -s /usr/bin/fd-find /usr/bin/fd

RUN add-apt-repository ppa:aos1/diff-so-fancy \
	&& add-apt-repository ppa:fish-shell/release-3 \
	&& apt-get update -y \
	&& apt-get install -y \
	diff-so-fancy \
	fish \
	&& rm -rf /var/lib/apt/lists/*

# hashicorp tools
RUN curl -fsSL "https://apt.releases.hashicorp.com/gpg" | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/hashicorp.list
RUN apt-get update && apt-get install -y \
	terraform \
	consul \
	nomad \
	vault \
	packer \
	vagrant \
	&& rm -rf /var/lib/apt/lists/*

# Install go
RUN curl -L "https://go.dev/dl/go1.21.1.linux-amd64.tar.gz" | tar -C /usr/local -xzvf -

# Install ansible
RUN pip3 install --upgrade pip; \
    pip3 install ansible

ARG USER=coder
RUN useradd ${USER} \
      --create-home \
      --shell=/bin/bash \
      --groups=docker,sudo \
      --user-group && \
    echo "${USER} ALL=(ALL) NOPASSWD:ALL" >>/etc/sudoers.d/nopasswd

# Setup go env vars
ENV GOROOT /usr/local/go
ENV PATH $PATH:$GOROOT/bin

ENV GOPATH /home/${USER}/go
ENV GOBIN $GOPATH/bin
ENV PATH $PATH:$GOBIN

USER ${USER}
WORKDIR /home/${USER}
```

### Proxmox Template (slightly abbreviated)

This is the Terraform configuration I was working on to create a Proxmox template for Coder workspaces. I've since moved on to using the `coderall` Docker image, but I hope to revisit this in the future.

```tf
provider "proxmox" {
  pm_api_url          = var.pm_api_url
  pm_api_token_id     = var.pm_token
  pm_api_token_secret = var.pm_secret
  pm_tls_insecure     = true
  pm_timeout          = 60 * 25
  pm_parallel         = 2
  pm_log_enable       = true
  pm_log_file         = "/var/log/terraform-plugin-proxmox.log"
  pm_debug            = true
  pm_log_levels = {
    _default    = "debug"
    _capturelog = ""
  }
}

locals {
  vm_name   = replace("${data.coder_workspace.me.owner}-${data.coder_workspace.me.name}", " ", "_")
  user_data = <<EOT
Content-Type: multipart/mixed; boundary="//"
MIME-Version: 1.0

--//
Content-Type: text/cloud-config; charset="us-ascii"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
Content-Disposition: attachment; filename="cloud-config.txt"

#cloud-config
hostname: ${lower(data.coder_workspace.me.name)}
users:
- name: ${lower(data.coder_workspace.me.owner)}
  sudo: ALL=(ALL) NOPASSWD:ALL
  shell: /bin/bash
cloud_final_modules:
- [scripts-user, always]

--//
Content-Type: text/x-shellscript; charset="us-ascii"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
Content-Disposition: attachment; filename="userdata.txt"

#!/bin/bash
export CODER_AGENT_TOKEN=${coder_agent.main.token}
sudo --preserve-env=CODER_AGENT_TOKEN -u ${lower(data.coder_workspace.me.owner)} /bin/bash -c '${coder_agent.main.init_script}' >/tmp/coder_agent.log 2>&1
--//--
EOT
}

# Copy the generated cloud_init config to the Proxmox node
resource "null_resource" "cloud_init_config_files" {
  connection {
    type     = "ssh"
    user     = var.user
    host     = var.pm_host
    password = var.password
  }

  provisioner "remote-exec" {
    inline = [<<EOT
cat << 'EOF' > "/var/lib/vz/snippets/user_data_vm-${data.coder_workspace.me.owner}-${data.coder_workspace.me.name}.yml"
${local.user_data}
EOF
    EOT
    ]
  }
}

resource "null_resource" "stop_vm" {
  count = data.coder_workspace.me.transition == "stop" ? 1 : 0

  depends_on = [
    proxmox_vm_qemu.workspace
  ]

  connection {
    type     = "ssh"
    user     = var.user
    host     = var.pm_host
    password = var.password
  }

  provisioner "remote-exec" {
    inline = ["qm stop $(qm list | grep \"${local.vm_name}\" |  awk '{print $1}')"]
  }
}

data "coder_workspace" "me" {
}

resource "coder_agent" "main" {
  arch                   = "amd64"
  os                     = "linux"
  startup_script_timeout = 600
  startup_script         = <<-EOT
    set -x

    echo Cloning dotfiles
    git clone --bare https://github.com/ecshreve/figgy.git "$HOME/.cfg"
    git --git-dir="$HOME/.cfg/" --work-tree="$HOME" checkout
    git --git-dir="$HOME/.cfg/" --work-tree="$HOME" pull --force

    echo "export PATH=$PATH:$HOME/.local/bin" > ~/.bash_profile
    source ~/.bash_profile
    fish -c 'setup'

    echo "Done!"
  EOT

  env = {
    GIT_AUTHOR_NAME     = "${data.coder_workspace.me.owner}"
    GIT_COMMITTER_NAME  = "${data.coder_workspace.me.owner}"
    GIT_AUTHOR_EMAIL    = "${data.coder_workspace.me.owner_email}"
    GIT_COMMITTER_EMAIL = "${data.coder_workspace.me.owner_email}"
  }
}

# resource "coder_app" "code-server" {
#   agent_id     = coder_agent.main.id
#   slug         = "code-server"
#   display_name = "code-server"
#   url          = "http://localhost:13337/?folder=/home/${data.coder_workspace.me.name}"
#   icon         = "/icon/code.svg"
#   subdomain    = false
#   share        = "owner"

#   healthcheck {
#     url       = "http://localhost:13337/healthz"
#     interval  = 5
#     threshold = 6
#   }
# }

resource "proxmox_vm_qemu" "workspace" {
  count       = 1
  target_node = var.node
  name        = "coder-${data.coder_workspace.me.owner}-${lower(data.coder_workspace.me.name)}"
  clone       = var.cloneimg
  full_clone  = false
  agent       = 1
  os_type     = "cloud-init"

  depends_on = [
    null_resource.cloud_init_config_files
  ]

  cpu      = "host"
  sockets  = 1
  cores    = var.cores
  memory   = var.mem
  scsihw   = "virtio-scsi-pci"
  bootdisk = "scsi0"

  disk {
    size    = var.disk
    type    = "scsi"
    storage = "local-lvm"
  }

  network {
    model  = "virtio"
    bridge = "vmbr1"
  }

  lifecycle {
    ignore_changes = all
  }


  cicustom                = "user=local:snippets/user_data_vm-${data.coder_workspace.me.owner}-${data.coder_workspace.me.name}.yml"
  cloudinit_cdrom_storage = "local-lvm"

  ipconfig0    = var.ip_config
  nameserver   = var.dns_server
  searchdomain = var.dns_search
  sshkeys      = var.pm_sshkeys
}
```

{% include refs.md %}