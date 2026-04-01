---
title: 'Setting Up a VPS from Scratch: What I Actually Do'
description: 'A walkthrough of how I set up a fresh Linux VPS — from locale and SSH hardening to nginx, Docker, fail2ban, and automated backups with rclone.'
pubDate: 'Jan 15 2024'
heroImage: '/logos/server-banner.jpg'
tags: ['linux', 'self-hosting', 'nginx', 'devops']
---

Every time I spin up a new VPS I do roughly the same sequence of things. I've got a [notes page](https://notes.sudomoon.com/server/vps_setup_smk/) that tracks the commands, but this is the reasoning behind them.

## First things: locale and system update

Fresh VPS images often have incomplete locale settings. First thing:

```bash
echo "export LC_ALL=C" > /etc/profile.d/lc_all.sh
exec bash
apt update && apt upgrade
apt-get dist-upgrade
```

Then install the basics: `sudo`, `stow`, `vim`, `net-tools`.

## User, SSH, and hardening

I add a non-root user, set up `authorized_keys`, and then lock down SSH:

```
Port 23415          # non-default port
PasswordAuthentication no
```

Then `service sshd restart`. Changing the default port eliminates most of the automated scanner noise before you even get to fail2ban.

For sudo without a password prompt (useful for scripts), I use a file in `/etc/sudoers.d/`. The warning here is real: get the permissions or syntax wrong and you can lock yourself out. Edit elsewhere, copy in.

## fail2ban

```bash
apt install fail2ban
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

I keep `maxretry = 3` and `bantime = 600`. The defaults are sensible — the main thing is to actually set it up and not leave the box naked. An alternative I've been meaning to try is [endlessh](https://github.com/skeeto/endlessh), which tarpits SSH scanners instead of banning them.

## nginx

I use nginx for everything — static sites, reverse proxies, internal services. A few non-obvious things I do:

- **Dummy self-signed cert on the default server**: prevents IP scanning tools from getting a valid response on `443` before your real domains are configured. The default server block returns 444 (drops the connection) on both 80 and 443.
- **dhparam.pem at 2048 bits**: generates once, stays. Use 4096 only if you have a beefy box.

SSL cert automation uses [lego](https://github.com/go-acme/lego) — a Let's Encrypt client written in Go. Simpler than certbot for my use case.

## Docker and service management

For containerised services I use [Dockge](https://github.com/louislam/dockge) instead of Portainer — it's lighter and compose-first. PostgreSQL, pgAdmin, JupyterHub all run in containers. PostgreSQL is explicitly not exposed outside localhost; pgAdmin only goes through nginx with auth.

I have a path setup in `/etc/profile.d/smkbin.sh` that adds `/opt/smkbin` and `/opt/minetest/mtbin` to PATH. Custom scripts and binaries live there, making them available system-wide without polluting `/usr/local/bin`.

## Backups with rclone + pCloud

```bash
rclone sync / pcloud:vps_bkp/${SERVER}/latest \
  --filter-from /root/.dotfiles/conf/filter.txt \
  --skip-links --update
```

Monthly cron job. `ntf` sends a push notification on completion (and on reboot). The filter file excludes `proc`, `sys`, `dev`, and other things you don't want to sync.

## What I'd do differently

The DNS setup with `dnsmasq` is useful but I've found myself skipping it on boxes that don't need internal name resolution. It adds one more thing to debug when networking behaves oddly. KISS.

The setup lives at [notes.sudomoon.com/server/](https://notes.sudomoon.com/server/) if you want the full command reference.
