#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -d "$POSTGRES_DB" <<-EOSQL
  CREATE SCHEMA IF NOT EXISTS mycats;

  SELECT pg_catalog.set_config('search_path', 'mycats,public', false);
  
  SET default_tablespace = '';
  SET default_table_access_method = heap;
  
EOSQL