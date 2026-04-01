---
title: "RAG Pipeline - Confluence & Bitbucket to Vector Store"
description: "Built a production RAG pipeline from scratch at JP Morgan Chase, ingesting Confluence documentation and Bitbucket source code into a vector store for semantic search and LLM-powered querying."
tech: ["Python", "RAG", "Vector Store", "Confluence API", "Bitbucket API", "LLMs", "Embeddings"]
category: "ai"
links: []
featured: false
priority: 5
date: "2024-06-01"
---

## Overview

Built an end-to-end Retrieval-Augmented Generation (RAG) pipeline at JP Morgan Chase that ingests internal Confluence documentation and Bitbucket source code into a vector store, enabling semantic search and grounded LLM responses over internal knowledge.

## Pipeline Architecture

**Ingestion**
- Pulled documents from Confluence via the REST API — pages, spaces, and attachments — with incremental sync to handle updates
- Pulled code and markdown from Bitbucket repositories, parsing files by extension and extracting meaningful chunks (functions, classes, docstrings, READMEs)

**Chunking & Embedding**
- Implemented document chunking strategies tailored to each source type: semantic chunking for prose (Confluence) and AST-aware chunking for code (Bitbucket)
- Generated embeddings using an LLM embedding model and stored them in a vector store with metadata for source, page/file path, and last-modified timestamp

**Retrieval & Generation**
- Built a retrieval layer with hybrid search (dense + keyword) to surface the most relevant chunks for a given query
- Wired retrieval results into an LLM prompt template to produce grounded, source-cited answers

## Key Design Decisions

- Incremental sync: only re-embed documents that changed since the last run, keeping the vector store fresh without full re-ingestion
- Metadata filtering: users can scope queries to a specific Confluence space or Bitbucket repository
- Prompt engineering: system prompts structured to cite sources and acknowledge when the context is insufficient

## Outcome

Enabled engineers to query internal documentation and codebases in natural language, reducing time spent manually searching Confluence and navigating large repositories.
