# Architecture

`dbverse` packages share a common architecture. `dbProject` manages database
connections and persistent project state. Scientific data classes build on
`dbData` and store their data in an embedded analytical database.

```mermaid
flowchart LR
  database[(Embedded analytical database)]
  dbdata[dbData base class]
  project[dbProject]
  matrix[dbMatrix]
  spatial[dbSpatial]
  sequence[dbSequence]

  project -->|manages connections| database
  project -->|pins and restores| dbdata
  dbdata --> matrix
  dbdata --> spatial
  dbdata --> sequence
  matrix -->|matrix tables| database
  spatial -->|spatial tables| database
  sequence -->|genomic tables| database
```

<p class="diagram-caption">Architecture of the current R implementation.</p>
