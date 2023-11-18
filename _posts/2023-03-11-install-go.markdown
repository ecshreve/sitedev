---
layout: post
title:  Install Go
tags: golang go how-to linux
---

Let's install `Go` on Linux.

## Install `Go` on Linux

Details and other instructions can be found in the official installation 
docs.[^go-install-docs] This is how I installed it on a virtual machine running Ubuntu 20.04.

```bash
# Download archive for your operating system
$ wget https://go.dev/dl/go1.20.2.linux-amd64.tar.gz

# Extract archive to /usr/local
$ tar -C /usr/local -xzf go1.20.2.linux-amd64.tar.gz

# Add go to PATH environment variable
$ export PATH=$PATH:/usr/local/go/bin

# Check things are working
$ go version
go version go1.20.2 linux/amd64

# Cleanup
$ rm go1.20.2.linux-amd64.tar.gz
```

---

{% include refs.md %}