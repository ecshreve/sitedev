---
layout: post
tags: golang linux install
old_link: https://shread.me/2023/03/11/install-go.html
---

Let's go through the process of installing Go on Linux.

For additional details and alternative methods, refer to the official installation documentation.[^golang-install-docs] Below, I'll share the steps I followed to install Go[^golang-home] on a virtual machine running Ubuntu 20.04.

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