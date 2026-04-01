---
title: 'PySpark in Production: Notes from Real Usage'
description: 'Things I wish I had known before using PySpark at scale — partition management, schema handling, streaming gotchas, and performance patterns that actually matter.'
pubDate: 'Mar 10 2024'
heroImage: '/logos/spark-logo.svg.png'
tags: ['pyspark', 'data-engineering', 'python', 'streaming']
---

I've been using PySpark at JP Morgan Chase for a couple of years now — processing 50+ GB of data daily, doing real-time streaming with Kinesis, building NiFi test utilities for large batch loads. These are the things I keep coming back to.

My notes on Spark basics live at [notes.sudomoon.com/pyspark/](https://notes.sudomoon.com/pyspark/) — this isn't a recap of those. This is the stuff that only shows up when you're running it for real.

## The partition problem is always the partition problem

Most Spark performance issues come down to partitioning. Either you have too few (tasks are too large, memory pressure, spill to disk) or too many (scheduling overhead, tiny shuffle files). The right number depends on your data and your cluster, and it changes.

`spark.sql.shuffle.partitions` defaults to 200, which is fine for tutorials and wrong for almost everything in production. I tune this per-job based on data volume. The rule of thumb I use: aim for partition sizes between 100MB and 1GB after shuffles.

Skew is the worse version of this problem. One partition with 10x the data of all others will cause your job to wait on that one task. `salting` keys before aggregation is the standard fix — add a random suffix to the join key, join, then aggregate again.

## Schema inference is a trap

`inferSchema=True` reads the data twice and is slow. Worse, it gets the schema wrong on messy real-world data — an integer column with one null becomes a string, a date column with an unusual format becomes a string, etc.

Define your schema explicitly with `StructType`. Yes, it's verbose. It's worth it every single time.

```python
from pyspark.sql.types import StructType, StructField, StringType, LongType

schema = StructType([
    StructField("event_id", StringType(), False),
    StructField("timestamp", LongType(), True),
    ...
])
df = spark.read.schema(schema).parquet(path)
```

## UDFs are expensive

Python UDFs involve serialising data to Python, running the function, and deserialising back to JVM. This is slow. For most operations, there's a native Spark function in `pyspark.sql.functions` that does what you need without leaving the JVM.

If you genuinely need a UDF, use Pandas UDFs (`@pandas_udf`) — they operate on batches via Arrow and are much faster than row-at-a-time Python UDFs.

## Structured Streaming specifics

For Kinesis streaming at volume (we handle 300 concurrent producers, ~50 MB/s), a few things matter:

- `maxRecordsPerFetch` and `maxFetchDuration` need to be tuned together. Too aggressive and you get memory pressure; too conservative and you fall behind.
- Checkpointing location matters. Put it somewhere durable (S3 or HDFS). Losing your checkpoint on a restart means replaying from the earliest available offset — expensive.
- Watermarking is not optional for stateful operations. Without it, Spark holds state forever and your job eventually OOMs.

## Databricks-specific

On Databricks, Delta Lake handles the ACID guarantees you'd otherwise have to build yourself. `OPTIMIZE` and `ZORDER` on hot columns make a difference for query performance on large tables. Don't skip the `VACUUM` job or your storage costs compound fast.

The Spark UI is your friend. The SQL tab shows physical plans. The Stage tab shows time-per-task distributions, which is how you spot skew. Reading plans before pushing jobs to production catches most problems.

---

The full structured notes on Spark concepts — DataFrames, SQL engine, RDDs, streaming internals — are at [notes.sudomoon.com/pyspark/](https://notes.sudomoon.com/pyspark/).
