# `dbverse`

<!-- badges: start -->

[![Lifecycle:
experimental](https://img.shields.io/badge/lifecycle-experimental-orange.svg)](https://lifecycle.r-lib.org/articles/stages.html#experimental)
[![Contributor
Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

<!-- badges: end -->

`dbverse` is an ecosystem of libraries for larger-than-memory scientific data
analysis built on embedded analytical databases and query engines such as
DuckDB and DataFusion. It provides database-backed representations for common
scientific data structures and exposes them through familiar scientific APIs.

The current implementation is centered on R. Python and Julia APIs are
incubating.

## Documentation

Visit the [dbverse documentation](https://dbverse-org.github.io/dbverse/) for
concepts, architecture, package information, and troubleshooting guidance.

## Documentation development

```sh
cd docs-vitepress
npm install
npm run docs:dev
```
