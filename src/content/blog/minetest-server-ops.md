---
title: 'Running Luanti/Minetest Servers: Notes from the Trenches'
description: 'How I run Minetest/Luanti game servers — building from source, configuring for multiple worlds, migrating to PostgreSQL, and keeping things running without babysitting.'
pubDate: 'Jun 01 2023'
heroImage: '/logos/luanti-background.webp'
tags: ['minetest', 'luanti', 'self-hosting', 'linux', 'gaming']
---

I've been running Minetest (now rebranded as [Luanti](https://www.luanti.org/)) servers for a few years. Multiple worlds, a small player community, bare metal VPS. Full notes live at [notes.sudomoon.com/mt/](https://notes.sudomoon.com/mt/). This is the condensed version of what actually matters.

## Choosing what to run

Minetest is a voxel game *engine*, not a game — it needs a game on top. Your options:

- **Minetest Game** — the reference game, most mods target it
- **MultiCraft** — Maksym's fork with a polished interface, supports both 0.4 and 5.x clients, most public servers run this
- **MineClone 2** — close Minecraft recreation, very stable
- **Final Minetest** — Robert Kiraly's improved fork, used as an education tool

I run MultiCraft for the wider client compatibility.

## Building from source (server-only)

For a Debian VPS:

```bash
sudo apt install g++ make libc6-dev cmake libbz2-dev libpng-dev libjpeg-dev \
  libgl1-mesa-dev libsqlite3-dev libogg-dev libvorbis-dev libopenal-dev \
  libcurl4-gnutls-dev libfreetype6-dev zlib1g-dev libgmp-dev libjsoncpp-dev \
  git postgresql postgresql-contrib libpq-dev libluajit-5.1-dev libzstd-dev

git clone --depth 1 https://github.com/MultiCraft/MultiCraft2.git multicraft
cd multicraft
git clone --depth 1 https://github.com/minetest/minetest_game.git games/minetest_game

cmake . -DRUN_IN_PLACE=1 -DBUILD_SERVER=1 -DBUILD_CLIENT=0 \
        -DENABLE_POSTGRESQL=1 -DENABLE_CURSES=1 -DENABLE_LUAJIT=1 \
        -DENABLE_SYSTEM_JSONCPP=1
make -j$(nproc)
```

Irrlicht is *not* needed for a server-only build — skip it.

## File layout for multiple worlds

The default all-in-one layout gets messy fast. I restructure:

```
~/
├── multicraft/         # engine binary
├── worlds/
│   └── prismo/         # world data
├── config/
│   └── prismo.conf     # per-world config
└── logs/               # dated log files
```

Then the start script:

```bash
#!/bin/sh
if [ -z "$STY" ]; then exec screen -dm -S mc /bin/bash "$0"; fi
while sleep 3; do
  $HOME/multicraft/bin/multicraftserver \
    --world $HOME/worlds/prismo \
    --terminal \
    --logfile $HOME/logs/$(date +"%m%d").txt \
    --config $HOME/config/prismo.conf
done
```

This runs inside a `screen` session (`screen -rx` to attach, `Ctrl-A D` to detach) and auto-restarts the server after crashes with a 3-second delay. Date-stamped log files make post-crash debugging much easier than one giant `debug.txt`.

## Key config settings

```ini
name = smk                          # admin username
debug_log_level = action
max_users = 20
default_privs = interact, shout, fast, home, tp
enable_rollback_recording = true
server_announce = true
port = 30029
```

Mod storage goes in `worlds/prismo/worldmods/` rather than the global `mods/` directory — this lets the same engine binary host multiple worlds with different modsets without `enable_modname = true` clutter.

## Migrating to PostgreSQL

SQLite is fine for small worlds. For larger maps or anything that takes a hit from disk I/O, PostgreSQL is worth it. There's a benchmark [here](https://niklp.net/posts/minetest-postgresql-benchmark/).

Add the connection strings to `world.mt`:

```ini
pgsql_connection       = host=localhost port=5432 user=smk password=... dbname=prismo
pgsql_auth_connection  = host=localhost port=5432 user=smk password=... dbname=prismo
pgsql_player_connection = host=localhost port=5432 user=smk password=... dbname=prismo
```

Then migrate each backend:

```bash
~/mt/bin/luantiserver --migrate postgresql --world ~/worlds/prismo
~/mt/bin/luantiserver --migrate-player postgresql --world ~/worlds/prismo
~/mt/bin/luantiserver --migrate-auth postgresql --world ~/worlds/prismo
```

Note: keep `mod_storage_backend = sqlite3`. SQLite is actually [recommended](https://niklp.net/posts/minetest-postgresql-benchmark/) for mod storage.

## Database maintenance

```bash
# size of the blocks table (world map data)
psql -c "SELECT pg_size_pretty(pg_total_relation_size('public.blocks'));"

# vacuum to reclaim dead row versions
VACUUM VERBOSE public.blocks;

# backup
pg_dump -U smk -h 127.0.0.1 -F c -b -v -f ~/bkp/$(date +%Y%m%d)_prismo.backup prismo
```

For trimming unused generated chunks from the map: [mapcleaner](https://github.com/minetest-go/mapcleaner) and [MapEditr](https://github.com/random-geek/MapEditr) are both useful.

## Minimum hardware

For a lightly modded server with ~10 concurrent users: **2 GB RAM, 50 GB storage** is fine. The CPU is rarely the bottleneck — Lua mod execution and map generation are the hot paths, and both are single-threaded.

More at [notes.sudomoon.com/mt/](https://notes.sudomoon.com/mt/).

