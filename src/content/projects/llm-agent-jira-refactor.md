---
title: "LLM Agent - Jira-Driven Code Refactoring Loop"
description: "Engineered an LLM agent orchestration system at JP Morgan Chase that reads Jira ticket requirements, fetches relevant code, applies fixes, commits, and triggers CI pipeline builds in an autonomous refactoring loop."
tech: ["Python", "LLM Agents", "MCP Servers", "Jira API", "Bitbucket API", "CI/CD", "Agentic Workflows"]
category: "ai"
links: []
featured: false
priority: 6
date: "2025-01-01"
---

## Overview

Built an autonomous LLM agent at JP Morgan Chase that closes the loop between a Jira ticket and a working code fix. The agent reads ticket requirements, locates the relevant code, proposes and applies fixes, commits them, and triggers CI builds — iterating until tests pass or an escalation threshold is hit.

## How It Works

**Step 1 - Ticket Intake**
The agent is triggered with a Jira ticket ID. It fetches the ticket title, description, acceptance criteria, and any linked tickets or comments via the Jira REST API. It builds a structured understanding of what needs to change and why.

**Step 2 - Code Retrieval**
Using the RAG pipeline and Bitbucket API, the agent fetches the files most relevant to the ticket — guided by the ticket description and any explicit file/module references in the ticket comments.

**Step 3 - Fix Generation**
The agent sends the retrieved code and ticket requirements to an LLM with a structured prompt that asks for a minimal, targeted code change. It receives a diff or patched file back.

**Step 4 - Commit & Build**
The agent applies the patch to the repository, creates a branch, commits with a descriptive message referencing the Jira ticket, and triggers the CI pipeline via the Bitbucket/Jenkins API.

**Step 5 - Refactoring Loop**
Once the build completes, the agent reads the build output (test failures, lint errors, compile errors). If failures exist, it feeds them back into the LLM with the original context and requests a revised fix. This loop continues until all checks pass or a configurable retry limit is reached.

## Key Challenges

- **Context window management**: Large codebases required careful chunking and prioritization of what to include in each LLM call
- **Non-determinism**: Fixed the loop with structured output schemas and explicit retry budgets to prevent infinite loops
- **Security**: Operated entirely within internal systems; no external LLM calls — used an internally hosted model endpoint

## Outcome

Reduced manual remediation effort for a class of well-defined refactoring tickets, and serve as a template for infrastructure patch automation (Terraform security patches / farm breaks).
