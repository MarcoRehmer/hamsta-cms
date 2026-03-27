# API Service

This directory contains the Go API runtime foundation for Hamsta CMS.

## Run locally

From `apps/api`:

```bash
go run .
```

Alternative command using the dedicated `cmd/` entrypoint:

```bash
go run ./cmd/api
```

The service starts on `0.0.0.0:8080` by default.

## Endpoints

- `GET /healthz` - liveness check
- `GET /readiness` - readiness check

## Environment variables

All variables are optional and have sane defaults.

- `API_SERVICE_NAME` (default: `hamsta-api`)
- `API_HOST` (default: `0.0.0.0`)
- `API_PORT` (default: `8080`)
- `API_LOG_LEVEL` (default: `info`)
- `API_READ_TIMEOUT` (default: `10s`)
- `API_WRITE_TIMEOUT` (default: `10s`)
- `API_SHUTDOWN_TIMEOUT` (default: `15s`)

## Graceful shutdown

The process handles `SIGINT`/`SIGTERM`. On shutdown it stops accepting new requests and allows
in-flight requests to complete within `API_SHUTDOWN_TIMEOUT`.
