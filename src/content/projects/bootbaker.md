---
title: "BootBaker - FreeBSD Bootloader CI Harness"
description: "Built a CI test harness for FreeBSD bootloader validation across all first and second-tier architectures as part of Google Summer of Code 2023, in collaboration with FreeBSD maintainer Warner Losh."
tech: ["Python", "Lua", "Jenkins", "GitHub Actions", "FreeBSD", "EDK II"]
category: "open-source"
links:
  - { label: "GitHub", url: "https://github.com/mightyjoe781/bootbaker" }
  - { label: "GSoC 2023", url: "https://summerofcode.withgoogle.com/programs/2023/projects/aa1ptICD" }
  - { label: "FreeBSD Wiki", url: "https://wiki.freebsd.org/SummerOfCode2023Projects/CITestHarnessForBootloader" }
featured: true
priority: 1
date: "2023-09-01"
---

## Overview

BootBaker is a CI test harness for the FreeBSD bootloader, built during Google Summer of Code 2023 under the mentorship of Warner Losh, a core FreeBSD developer. The project systematically validates bootloader behavior across all first and second-tier FreeBSD architecture combinations.

## Problem

FreeBSD supports a wide range of hardware architectures - amd64, arm64, riscv, powerpc, and more. Before BootBaker, there was no automated way to validate that the bootloader worked correctly across all architecture/firmware combinations. This made it difficult to catch regressions early.

## What I Built

- Modular Python and Lua scripts for automated bootloader testing with dynamic configuration, structured reporting, and error handling
- A test matrix covering all first and second-tier FreeBSD architecture combinations
- Linux boot support for amd64 and arm64 via Linux EFI Shim (EDK II), enabling FreeBSD/Linux dual-boot compatibility testing
- CI pipeline integration with Jenkins and GitHub Actions for automated test result reporting

## Key Outcomes

- Automated regression testing for the FreeBSD bootloader across architectures
- Bridged FreeBSD/Linux compatibility via EFI Shim integration
- Accepted into FreeBSD upstream; documented on the FreeBSD Wiki
