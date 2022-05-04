# MyCats
*Miguel Rivas*

## Overview
This repo contains the source of an Node/Express API and React web app (both on TypeScript).

```
.
├── .github/            # CD/CI files
├── api/                # Node/Express API
├── webapp/             # React Web App
├── db-startup.sh       # Startup script for PostgreSQL DB
├── docker-compose.yml  # Docker Compose script for easy deployment
└── nginx               # Nginx proxy configuration file
```
Also, you'll find a directory description under API folder.

You can take a look at: https://migue.xyz

## Running with Docker
1. Copy and fill the environment file,
```
cp .env.example .env
```
2. Execute Docker Compose script,
```
docker compose up -d --build
```
Note: if app doesn't works correctly, it might be cause due API, migrations apply,
please restart the API service with
```
docker compose restart api
```
and try again.

## Populating Cat Tracking
You can simulate cat tracking, hitting an API endpoint with curl as follows:
```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{ "point": { "latitude": 10.3361592, "longitude": -84.4307032 } }' \
    https://{API-BASE-URL}/tracking/{CAT-ID}
```
