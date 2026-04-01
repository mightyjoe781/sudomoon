---
title: "PySpark Data Pipelines - Big Data Ingestion at Scale"
description: "Built scalable PySpark ingestion and transformation pipelines on Databricks at JP Morgan Chase, processing 50+ GB of data daily into a centralized data lake. Reduced pipeline runtime by 30% through structured streaming optimizations."
tech: ["PySpark", "Databricks", "Apache NiFi", "Python", "AWS Kinesis", "Structured Streaming"]
category: "systems"
links: []
featured: false
priority: 4
date: "2023-01-01"
---

## Overview

At JP Morgan Chase, I built and optimized large-scale data ingestion and transformation pipelines running on Databricks, handling 50+ GB of daily data flowing into a centralized data lake. The work spanned batch ingestion, structured streaming, and real-time pipeline validation.

## What I Built

**Databricks PySpark Pipelines**
- Designed modular ingestion pipelines using PySpark DataFrames and Spark SQL, processing structured and semi-structured data from multiple upstream sources
- Applied partition pruning, broadcast joins, and adaptive query execution to reduce pipeline runtime by 30%
- Implemented schema evolution handling and data quality checkpoints at each transformation stage

**Apache NiFi Test Utilities**
- Developed a test utility framework for Apache NiFi data flows handling 30-40 GB per single load
- Enabled reliable validation of processor chains, backpressure behavior, and error routing without needing a full production environment

**Real-Time Streaming**
- Built real-time ingestion paths using AWS Kinesis, supporting ~300 concurrent producers and sustaining 50+ MB/s aggregate throughput under bursty workloads
- Used Spark Structured Streaming for continuous processing with watermarking and late-data handling

## Key Outcomes

- 30% reduction in batch pipeline runtime through query optimization
- Reliable test coverage for NiFi flows handling tens of GBs per load
- Scalable streaming infrastructure supporting hundreds of concurrent data producers
