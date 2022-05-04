# MyCats: API

## Overview
```
.
├── src/                # Project Source
|    ├─ data/           # Data Access Implementations
|    ├─ models/         # Model Business Logic Definitions
|    ├─ repositories/   # Data Access Definitions
|    ├─ routes/         # API HTTP Resouces
|    ├─ services/       # Business Logic Services
|    ├─ utils/          # General purpuse utilities
|    ├─ validators/     # Model validators
|    ├─ app.ts          # Express Application
|    ├─ environment.ts  # Environment variables
|    ├─ index.ts        # API Entrypoint
|    └─ telemetry.ts     # Logging tools
|── tests/              # Test suites
├── db-startup.sh       # Startup script for PostgreSQL DB
├── docker-compose.yml  # Docker Compose script for easy deployment
└── nginx               # Nginx proxy configuration file
```
Only relevant files are shown

## Running
1. Create a copy of environment file,

```bash
cp .env.example .env
```

2.Setup the DB with
```bash
docker compose up -d postgres
```
3. Then, install Node packages and run with,
```bash
yarn dev
```

### Tests
Run tests with,
```bash
yarn test
```

## Migrations
Generate migrations
```bash
yarn typeorm:cli migration:generate <MIGRATION-NAME>
```

Apply migrations
```bash
yarn typeorm:cli migration:run
```