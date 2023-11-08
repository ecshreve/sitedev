---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

# Eric Shreve
## Full Stack Software Engineer

_Innovating at the intersection of technology and user experience._

[View My Work](#projects) | [Learn More About Me](#about)

## Interests

### Development
{% include brief.html 
  tech = "Go"
  desc = "Developed backend microservices with a focus on GraphQL and gRPC integration. Utilized as the primary programming language across a range of personal projects."
  icon = '<i class="fa-brands fa-golang"></i>'
  link = "/tech/go"
%}

{% include brief.html 
  tech = "Python"
  desc = "s"
  link = "/tech/python"
  icon = '<i class="fa-brands fa-python"></i>'
%}

{% include brief.html 
  tech = "GraphQL"
  desc = "s"
  link = "/tech/graphql"
  icon = '<svg svg class="svg-icon" style="margin-right: 5px" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50"><path d="M 25 2 C 22.788 2 21 3.788 21 6 C 21 6.319683 21.048567 6.6259743 21.119141 6.9238281 L 10.945312 12.310547 C 10.214286 11.510118 9.1715211 11 8 11 C 5.788 11 4 12.788 4 15 C 4 16.8551 5.2763474 18.409919 7 18.857422 L 7 31.142578 C 5.2764206 31.587904 4 33.135681 4 35 C 4 37.201 5.788 39 8 39 C 9.1715211 39 10.214286 38.489882 10.945312 37.689453 L 21.119141 43.076172 C 21.048567 43.374026 21 43.680317 21 44 C 21 46.212 22.788 48 25 48 C 27.212 48 29 46.201 29 44 C 29 43.680317 28.951433 43.374026 28.880859 43.076172 L 39.054688 37.689453 C 39.785714 38.489882 40.828479 39 42 39 C 44.212 39 46 37.201 46 35 C 46 33.135681 44.723579 31.587904 43 31.142578 L 43 18.857422 C 44.723653 18.409919 46 16.8551 46 15 C 46 12.788 44.212 11 42 11 C 40.828479 11 39.785714 11.510118 39.054688 12.310547 L 28.880859 6.9238281 C 28.951804 6.6260098 29 6.3189534 29 6 C 29 3.788 27.212 2 25 2 z M 22.054688 8.6894531 C 22.097766 8.7366217 22.132464 8.7908863 22.177734 8.8359375 L 9.0859375 31.167969 C 9.0569126 31.159764 9.0292907 31.148188 9 31.140625 L 9 18.857422 C 10.723579 18.412096 12 16.864319 12 15 C 12 14.680317 11.951433 14.374026 11.880859 14.076172 L 22.054688 8.6894531 z M 27.943359 8.6894531 L 38.119141 14.076172 C 38.048567 14.374026 38 14.680317 38 15 C 38 16.864319 39.276421 18.412096 41 18.857422 L 41 31.140625 C 40.970709 31.148188 40.943087 31.159764 40.914062 31.167969 L 27.820312 8.8339844 C 27.865175 8.7893146 27.900645 8.7361897 27.943359 8.6894531 z M 26.085938 9.8300781 L 39.177734 32.164062 C 38.678164 32.661212 38.324556 33.295677 38.142578 34 L 11.857422 34 C 11.675444 33.295677 11.321836 32.661212 10.822266 32.164062 L 23.914062 9.8320312 C 24.261437 9.9302299 24.620841 10 25 10 C 25.379287 10 25.738459 9.9288212 26.085938 9.8300781 z M 12.025391 36 L 37.974609 36 L 27.945312 41.310547 C 27.214286 40.510118 26.171521 40 25 40 C 23.828479 40 22.785714 40.510118 22.054688 41.310547 L 12.025391 36 z"/></svg>
  <i class="fa-brands fa-graphql"></i>'
%}

{% include brief.html 
  tech = "Typescript + React"
  desc = "frontend"
  icon = '<svg class="svg-icon" style="margin-right: 5px" viewBox="0 0 50 50"><path d="M45,4H5C4.447,4,4,4.448,4,5v40c0,0.552,0.447,1,1,1h40c0.553,0,1-0.448,1-1V5C46,4.448,45.553,4,45,4z M29,26.445h-5V42h-4	V26.445h-5V23h14V26.445z M30.121,41.112v-4.158c0,0,2.271,1.712,4.996,1.712c2.725,0,2.62-1.782,2.62-2.026	c0-2.586-7.721-2.586-7.721-8.315c0-7.791,11.25-4.717,11.25-4.717l-0.14,3.704c0,0-1.887-1.258-4.018-1.258s-2.9,1.013-2.9,2.096	c0,2.795,7.791,2.516,7.791,8.141C42,44.955,30.121,41.112,30.121,41.112z"/></svg>
  <i class="fa-brands fa-react"></i>'
  link = "/tech/frontend"
%}

{% include brief.html 
  tech = "SQL"
  desc = "s"
  link = "/tech/sql"
  icon = '<i class="fa-brands fa-database"></i>'
%}

<hr>

### DevOps
{% include brief.html 
  tech = "Terraform"
  desc = "Applied Terraform in infrastructure management dynamically generating configurations from Go definitions.	Orchestrate the deployment of virtual machines to Proxmox environment."
  link = "/tech/terraform"
  icon = '<svg class="svg-icon" style="margin-right: 5px" id="tf" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><polygon class="cls-1" points="102.58 46.91 141.41 69.33 141.41 114.16 102.58 91.75 102.58 46.91"/><polygon class="cls-1" points="145.67 69.33 145.67 114.16 184.5 91.75 184.5 46.91 145.67 69.33"/><polygon class="cls-1" points="59.5 21.88 59.5 66.72 98.33 89.14 98.33 44.3 59.5 21.88"/><polygon class="cls-1" points="102.58 141.49 141.41 163.91 141.41 119.38 141.41 119.08 102.58 96.66 102.58 141.49"/></svg>'
%}

{% include brief.html 
  tech = "Absible"
  desc = "s"
  link = "/tech/ansible"
  icon = '<svg class="svg-icon" style="margin-right: 5px" viewBox="-5 -5 42 42" xmlns="http://www.w3.org/2000/svg"><path d="M14.156 15.297l6.25 4.927-4.141-10.214zM16 0c-8.839 0-16 7.161-16 16s7.161 16 16 16c8.839 0 16-7.161 16-16s-7.161-16-16-16zM23.729 23.073c-0.016 0.63-0.536 1.125-1.167 1.109-0.313 0-0.552-0.12-0.885-0.391l-8.255-6.667-2.771 6.938h-2.396l6.995-16.807c0.167-0.422 0.568-0.693 1.021-0.677 0.432-0.016 0.839 0.25 0.99 0.677l6.365 15.323c0.057 0.151 0.104 0.313 0.104 0.464 0 0.010 0 0.010 0 0.031z"/></svg>'
%}

{% include brief.html 
  tech = "Consul + Nomad"
  desc = "s"
  link = "/tech/nomad"
  icon = '<svg class="svg-icon" style="margin-right: 5px" id="consul" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><path d="M91.09,150.63A62.15,62.15,0,1,1,133.15,42.74h0l-14.7,15.43h0a40.83,40.83,0,1,0,0,60.62h0l14.7,15.43h0A62,62,0,0,1,91.09,150.63Z"/><path d="M141.11,119.54a5.09,5.09,0,1,1,5.1-5.09A5.1,5.1,0,0,1,141.11,119.54Z"/><path d="M90.7,101.93a13.46,13.46,0,1,1,13.46-13.45A13.47,13.47,0,0,1,90.7,101.93Z"/><path d="M147,102.13A5.09,5.09,0,1,1,152.05,97,5.11,5.11,0,0,1,147,102.13Z"/><path d="M131.81,101.55a5.1,5.1,0,1,1,5.09-5.09A5.1,5.1,0,0,1,131.81,101.55Z"/><path d="M147,85a5.09,5.09,0,1,1,5.09-5.09A5.11,5.11,0,0,1,147,85Z"/><path d="M131.81,85.59a5.09,5.09,0,1,1,5.09-5.09A5.09,5.09,0,0,1,131.81,85.59Z"/><path d="M141.4,67.88a5.1,5.1,0,1,1,5.09-5.09A5.1,5.1,0,0,1,141.4,67.88Z"/></svg>
  
  <svg class="svg-icon" style="margin-right: 5px" id="nomad" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><path d="M98.51,20.16,39.86,54v67.73l58.65,33.86,58.65-33.86V54Zm26.13,74.48-15.63,9L90.13,93.39V115L72.38,126.23V81.11l14.08-8.62L106,82.79v-22l18.65-11.2Z"/></svg>

<i class="fa-brands fa-nomad"></i>'
%}

{% include brief.html 
  tech = "Docker"
  desc = "s"
  link = "/tech/docker"
  icon = '<i class="fa-brands fa-docker"></i>'
%}

<hr>

### Infrastructure

{% include brief.html 
  tech = "Linux"
  desc = "s"
  link = "/tech/linux"
  icon = '<i class="fa-brands fa-linux"></i>'
%}

## About Me

Go
Python
Typescript
React
Terraform
Docker
Packer
Nomad
Consul
AWS
DigitalOcean
SQL
MongoDB
Linux
Proxmox
Datadog
Grafana
Prometheus
Databricks
GithubActions
Gitlab
Jenkins
Ubiquti
Synology
Networking
GraphQL
Grpc
