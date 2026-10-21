# MoneyMate — Cloud & DevOps starter

This keeps the existing React/Vite frontend and Express/Mongoose backend, and adds Docker Compose for local container testing.

## Prerequisites
- Docker Desktop installed and running (with Linux containers/WSL 2 enabled on Windows)
- Git (optional for the first local test)

## Run locally with Docker
Open PowerShell in this folder (`MoneyMate-Cloud-DevOps`) and run:

```powershell
docker compose up --build
```

When the images build and containers start, open http://localhost:8080. The frontend is served by Nginx; API paths are routed internally to the backend, which connects to MongoDB in the Compose network.

Stop the containers with `Ctrl+C`, then run:

```powershell
docker compose down
```

To stop and also delete the local MongoDB data volume, run `docker compose down -v` (this permanently deletes that local container database).

## Troubleshooting
- Check service status: `docker compose ps`
- Backend logs: `docker compose logs backend`
- Frontend logs: `docker compose logs frontend`
- MongoDB logs: `docker compose logs mongo`
- Rebuild after code/config changes: `docker compose up --build`

## Important
- This starter has not been executed against your Windows environment yet; validate it locally and share the exact error output if anything fails.
- Do not commit `.env` files, credentials, connection strings containing passwords, or cloud keys.
- This setup uses a local MongoDB container; it does not deploy anything to Azure or create cloud charges.
