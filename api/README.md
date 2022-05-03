# MyCats: API

## Running
```bash
docker compose up --build -d
```

```bash
cp .env.example .env
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