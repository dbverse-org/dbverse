# Troubleshooting

This page collects common issues that appear across `dbverse` workflows,
primarily in R.

## Database lock errors

DuckDB uses file-level locks. A file-backed database can fail to open when
another process still has a conflicting connection.

A typical error appears below.

```text
Error: Could not set lock on file "path/to/database.duckdb":
Conflicting lock is held by another process.
```

Common causes include the following.

- Another R session is connected to the same database.
- Another session or process still has a live connection.
- Multiple scripts are trying to write to the same database at once.

The preferred fix is to close the active connection cleanly.

*Note:* Disconnecting may make temporary or in-memory objects unavailable.
Persist or collect any results you need before disconnecting.

::: code-group

```r [R]
proj$disconnect()

DBI::dbDisconnect(con)
```

```text [Python]
⌀
```

```text [Julia]
⌀
```

:::
For concurrent read-only work, open the DuckDB database in read-only mode.

::: code-group

```r [R]
con <- DBI::dbConnect(
  duckdb::duckdb(),
  dbdir = "path/to/database.duckdb",
  read_only = TRUE
)
```

```text [Python]
⌀
```

```text [Julia]
⌀
```

:::
## No active or cached connection

This usually means the project connection was closed or never established.

::: code-group

```r [R]
proj$reconnect()
```

```text [Python]
⌀
```

```text [Julia]
⌀
```

:::
## Stale lazy references after restart

Lazy table references depend on a live database connection. Use `dbProject` pins
for objects that need to survive restarts.

::: code-group

```r [R]
proj <- dbProject$new(path = "my_project", dbdir = "data.duckdb")
proj$reconnect()

my_data <- proj$pin_read("my_table")
```

```text [Python]
⌀
```

```text [Julia]
⌀
```

:::
## Memory pressure

Avoid collecting large lazy tables. Filter, summarize, or materialize in the
analytical database first, and collect only the smaller result.

::: code-group

```r [R]
lazy_filtered <- big_table |>
  dplyr::filter(gene == "BRCA1")

result <- dplyr::collect(lazy_filtered)

filtered_data <- proj$pin_write(
  x = lazy_filtered,
  name = "filtered"
)
```

```text [Python]
⌀
```

```text [Julia]
⌀
```

:::
## Slow workflows

Complex lazy query chains can become expensive. Inspect the query plan and
materialize important intermediates before reusing them.

::: code-group

```r [R]
materialized <- complex_result |>
  dplyr::compute(name = "materialized", temporary = FALSE)
```

```text [Python]
⌀
```

```text [Julia]
⌀
```

:::
## Getting help

- Check the relevant package site in the [Index](packages.md).
- Confirm you are using current development versions from the dbverse GitHub
  organization.
- Include a minimal reproducible example when filing an issue.
