---
title: "Minetest Servers - Prismo & Adventure Time"
description: "Operated two long-running Minetest game servers with custom Lua mods, bare-metal C++ hosting, and active player communities. Built mods for guilds, API bridges, chat moderation, and more."
tech: ["C++", "Lua", "Linux", "Bare-metal", "Minetest"]
category: "game-dev"
links:
  - { label: "Prismo Discord", url: "https://discord.gg/NQvCBhy9pu" }
  - { label: "Adventure Time Discord", url: "https://discord.gg/prEGExvPja" }
featured: true
priority: 3
date: "2020-01-01"
---

## Overview

Minetest is an open-source voxel game engine written in C++ with a Lua modding API. I operated two Minetest servers - Prismo and Adventure Time - each with distinct gameplay styles and active communities.

## Servers

**Prismo** - A technical server built around the mesecons (redstone-equivalent) and technic (industrial/automation) mod ecosystems. Players engineer complex automated systems and contraptions.

**Adventure Time** - A roleplay/fantasy server themed after the original Adventure Time animated series. Featured custom lore, factions, and questlines.

## Mods I Built

- **guilds_redo** - Full guild system with MVC architecture, persistent storage, and in-game UI via Lua formspecs
- **mt_web_bridge** - A producer-consumer queue system allowing remote command execution in-game via an HTTP bridge
- **censor** - Chat censoring mod with configurable word lists and moderation logging
- **wiki** - In-game wiki management system using Lua formspecs
- **info** - Announcement and message-of-the-day system
- **mini_builder** - Restricted item distribution mod (imitation of /give with configurable limits)

## What I Learned

Running these servers taught me bare-metal Linux hosting, security hardening (DDoS mitigation is a real problem for public game servers), Lua scripting at scale, and community management. It's where most of my systems operations instincts were built.
