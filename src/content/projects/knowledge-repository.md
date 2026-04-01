---
title: "Knowledge Repository - Self-Hosted Developer Platform"
description: "A self-hosted notes and reference platform running on bare-metal Linux. Covers DSA, system design, Go, Python, PySpark, FreeBSD, AWS, Databricks, and more. Full observability stack with Grafana, Loki, and Uptime Kuma."
tech: ["Docker", "Nginx", "Cloudflare", "Grafana", "Loki", "Python", "MkDocs", "Portainer", "Uptime Kuma"]
category: "systems"
links:
  - { label: "notes.sudomoon.com", url: "https://notes.sudomoon.com" }
  - { label: "algo.sudomoon.com", url: "https://algo.sudomoon.com" }
featured: true
priority: 2
date: "2021-01-01"
---

## Overview

A self-hosted platform for developer notes, algorithm references, and technical writing - running continuously since 2021 on bare-metal Linux. The site covers a broad range of technical topics and serves as both a personal reference and a public resource.

## Topics Covered

- **Software Engineering**: DSA, System Design, Databases, Networking, OS internals
- **Programming Languages**: Python, Go, PySpark, C/C++, Lua
- **Cloud & Infrastructure**: AWS (Glue, Lambda, Kinesis, DynamoDB), Databricks, Microservices, Docker, Kubernetes, Terraform
- **Developer Tooling**: Git, tmux, Vim, Unix tools, Dev setup
- **Systems**: FreeBSD, Linux, MacOS, Server management
- **AI & ML**: LLMs, agent workflows, RAG pipelines
- **Books**: Technical reading notes (Pragmatic Programmer, DDIA, DDD, and more)

## Infrastructure

- Bare-metal Linux server with manual provisioning and hardening
- **Nginx** for reverse proxying and TLS termination; **Cloudflare** for DNS, CDN, and DDoS protection
- All services containerized with **Docker**, managed via **Portainer**
- Full observability: **Grafana** dashboards, **Loki** for centralized log aggregation, **Uptime Kuma** for real-time health monitoring
- Static site generation via MkDocs - reproducible build and deploy pipeline
