DROP TABLE IF EXISTS accounts CASCADE;

CREATE TABLE accounts (
    name    text  PRIMARY KEY,
    colDefs JSONB NOT NULL,
    tagDefs JSONB NOT NULL,
    rowData JSONB NOT NULL
);