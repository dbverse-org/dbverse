# dbverse

**Note: `{dbverse}` is in early development. Changes to the below are likely to occur.**

## Class Diagram
```mermaid
classDiagram
direction LR

namespace Scientific-Data {
    class Tabular{
        .mtx
        .csv
        .parquet
        dgcMatrix
        matrix
        data.frame
        data.table
    }

    class Geometries{
        50+ spatial file formats
        sf::sf
        terra::spatVector
    }

    class Biological-Sequences{
        10+ genomic file formats
    }
}

namespace computer {
    class database
}

namespace dbverse {
    class dbmatrix-r{
        class dbMatrix
    }

    class dbspatial-r{
        class dbSpatial
    }

    class dbsequence-r{
        class dbSequence
    }

    class dbproject-r{
        class dbData
    }
}

namespace dbmatrix-r {
    class dbMatrix {
        <<S4 Class>>
        + value: tbl_duckdb_connection
        + name: character
        + dim_names: list
        + dims: integer
        + init: logical
        - Arith()
        - Ops()
        - Math()
        - Summary()
        - Matrix::
        - matrix::
    }
}

namespace dbspatial-r {
    class dbSpatial{
        <<S4 Class>>
        + value: tbl_duckdb_connection
        + name: character
        - ST_*(geom) [DuckDB Spatial Extension]
    }
}

namespace dbsequence-r {
    class dbSequence{
        <<S4 Class>>
        + value: tbl_duckdb_connection
        + name: character
    }
}

namespace dbproject-r {
    class dbData {
        <<base virtual class>>
        + value: ANY (tbl_sql)
        + name: character
        - DBI::()
        - dplyr::()
        - dbReconnect()
        - autoreconnection()
    }
}

Tabular <..> dbmatrix-r : read/write
Geometries <..> dbspatial-r : read/write
Biological-Sequences <..> dbsequence-r : read/write

dbmatrix-r --> dbproject-r
dbspatial-r --> dbproject-r
dbsequence-r --> dbproject-r

dbproject-r <..> database : connect/disconnect/cache
```

