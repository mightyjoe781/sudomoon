---
title: 'GSoC 2023: Building a CI Test Harness for the FreeBSD Boot Loader'
description: 'What I worked on during Google Summer of Code 2023 with the FreeBSD Foundation — writing a CI test harness for the boot loader, working under Warner Losh.'
pubDate: 'Sep 20 2023'
heroImage: '/logos/freebsd-logo.png'
tags: ['freebsd', 'gsoc', 'open-source', 'systems']
---

This past summer I had the chance to participate in Google Summer of Code with the FreeBSD Foundation, working on a CI test harness for the FreeBSD boot loader. My mentor was Warner Losh — if you've spent any time around FreeBSD, you know his name. Good mentor, direct feedback, genuinely cares about the infrastructure getting done right.

## What the project was about

The FreeBSD boot loader is a critical piece of the OS that rarely gets automated coverage. Testing it properly is hard: you're dealing with code that runs before the kernel, so you can't lean on the usual unit test frameworks. Any regressions can go unnoticed for a while.

The goal was to build out a CI test harness that could exercise the boot loader automatically — running test cases against virtual machines to catch regressions early, and integrating with FreeBSD's existing CI infrastructure.

## What I learned

**Boot infrastructure is stranger than you think.** The FreeBSD boot sequence goes through a few stages — the MBR or EFI stub, then the loader itself (`loader.efi` on modern hardware, `loader` on BIOS systems), then the kernel. Each stage has different constraints: limited stack, no libc, sometimes no MMU. Writing tests for code that operates in those constraints means you eventually find yourself building wrapper environments and shim layers.

**Virtual machines are the right tool here.** QEMU makes it possible to run a bootloader test in a controlled environment without touching real hardware. Getting consistent results out of VM-based boot tests is its own engineering problem — timeouts, serial console output parsing, knowing the difference between "boot succeeded" and "boot appeared to succeed before hanging."

**Reading C I didn't write.** The FreeBSD bootloader codebase is well-maintained but dense. Warner's code review style is direct: if something is wrong, you find out. That's a good thing, even if it's uncomfortable in the moment.

## Final thoughts

FreeBSD is a project where the culture of rigor is real. Patches go through actual review. The mailing lists are active. Decisions are made with the long-term health of the codebase in mind.

If you're thinking about GSoC and have any interest in systems programming or OS internals, the FreeBSD Foundation consistently puts up good projects. The application process is competitive but the mentoring you get is worth it.

The final report and code are linked from the [FreeBSD SoC 2023 wiki page](https://wiki.freebsd.org/SummerOfCode2023Projects).
