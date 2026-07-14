
# dbverse

<p class="badges">
  <a href="https://lifecycle.r-lib.org/articles/stages.html#experimental"><img style="display: inline-block" src="https://img.shields.io/badge/lifecycle-experimental-orange.svg" alt="Lifecycle: experimental"></a>
  <a href="/dbverse/conduct"><img style="display: inline-block" src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg" alt="Contributor Covenant"></a>
</p>

`dbverse` is an ecosystem of libraries for larger-than-memory scientific data
analysis built on embedded analytical databases and query engines such as
DuckDB and DataFusion.
It provides database-backed representations for common scientific data
structures—including matrices, spatial geometries, and genomic intervals—plus
object-relational mappings (ORMs) that expose them through familiar scientific
APIs. The current implementation is centered on R.

## Core packages

| Package | Purpose |
| --- | --- |
| `dbProject` | Connection management, persistent projects, pins, and shared `dbData` infrastructure. |
| `dbMatrix` | Sparse and dense matrix objects backed by analytical databases. |
| `dbSpatial` | Spatial geometries and operations backed by analytical databases. |
| `dbSequence` | Lazy genomic data ingestion, interval filtering, and coverage workflows. |

## Installation

::: code-group

```r [R]
install.packages("pak")

pak::pak(c(
  "dbverse-org/dbproject-r",
  "dbverse-org/dbmatrix-r",
  "dbverse-org/dbspatial-r",
  "dbverse-org/dbsequence-r"
))
```

```text [Python]
⌀
```

```text [Julia]
⌀
```

:::
## Where to start

- To understand how the packages fit together, read the [Overview](concepts.md).
- To choose the right package for a task, use the [Index](packages.md).
