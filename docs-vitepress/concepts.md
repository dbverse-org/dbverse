# Concepts

The sections below introduce the core concepts that distinguish `dbverse`.
Embedded analytical engines execute the queries. The data may live in database
tables or registered data sources. `dbverse` objects hold lazy references to
these relations. Package methods translate familiar scientific operations into
database queries or native engine expressions
([Raasveldt and Mühleisen, 2019](https://doi.org/10.1145/3299869.3320212);
[Lamb et al., 2024](https://doi.org/10.1145/3626246.3653368)).

## Object-Relational Mappings

`dbverse` libraries use an object-relational mapping pattern for scientific
data. They expose familiar objects such as matrices, spatial geometries, and
genomic intervals. The underlying data is represented as relations. Package
methods translate object operations into Structured Query Language (SQL) queries
or equivalent engine expressions. This design lets researchers work through
established scientific APIs without needing to write SQL. It also helps them
reuse codebases built around those APIs.

## Lazy Evaluation

`dbverse` objects refer to database-backed tables instead of holding a full copy
of the data in the host language. Operations extend a query plan without
immediately executing it. A terminal operation executes the plan and materializes
the requested result. This reduces unnecessary client-side copies and supports
datasets larger than available memory.

## Query Pushdown

Filters and column selections should be incorporated into the query plan.
Predicate pushdown moves filter conditions toward the data source. Supported
scans can then skip irrelevant data. Projection pushdown requests only the
required columns. Both can reduce input/output, data movement, and memory use
([Lamb et al., 2024](https://doi.org/10.1145/3626246.3653368)).

## Columnar Compression

Columnar storage places values from the same column together. These values share
a type and often have similar distributions. This makes them effective targets
for compression. Storage engines and file writers can choose lightweight
encodings for each column segment. Compression lowers storage use and can
improve query speed by reducing the amount of data read from disk
([Abadi et al., 2006](https://doi.org/10.1145/1142473.1142548);
[Raasveldt, 2022](https://duckdb.org/2022/10/28/lightweight-compression)).

## Larger-than-Memory Execution

Embedded analytical engines commonly process columnar data in batches.
Vectorized execution reduces the overhead of processing one row at a time
([Boncz et al., 2005](https://www.cidrdb.org/cidr2005/papers/P19.pdf)). Engines
with out-of-core execution can spill eligible intermediate state to disk when
memory is constrained
([Kuiper et al., 2024](https://duckdb.org/pdf/ICDE2024-kuiper-boncz-muehleisen-out-of-core.pdf)).
Spilling support depends on the engine and operator. `dbverse` keeps operations
lazy so the engine can plan and execute this work. A workflow should materialize
only results that fit in host memory.

## Connection Lifecycle

One-off scripts can use a direct database connection. Projects that span
multiple sessions need a durable way to recreate connections and restore dataset
references. The current R implementation provides this lifecycle through
`dbProject`.

| Use case | Recommended pattern |
| --- | --- |
| One-off exploration | Open a direct connection and close it after the task |
| Multi-session analysis | Store engine settings in persistent project configuration (`dbProject`) |
| Reopening lazy objects | Reconnect and restore references from stable metadata (`dbProject`) |
| Library-level persistence | Save object metadata and a reconnection recipe instead of a live connection (`dbProject`) |

## Further Reading

- [DuckDB documentation](https://duckdb.org/docs/stable/)
- [Apache DataFusion documentation](https://datafusion.apache.org/user-guide/introduction.html)
- [Architecture of a Database System](https://doi.org/10.1561/1900000002)
