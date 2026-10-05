# Agent Guidelines

## Deployment Workflow

When the user says **"deploy"** (or asks to trigger a deployment / release):
- **Kick off the GitHub deployment flow**:
  ```bash
  make deploy
  ```
  *(or `make deploy.github`)*
- **How it works**:
  1. Generates an annotated git tag using a 14-digit timestamp in `YYYYMMDDHHMMSS` format (e.g., `20261005150000`).
  2. Pushes the tag to `origin`.
  3. The GitHub Actions workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) triggers on tag push (`20*`), validates the format, builds the multi-stage Docker image, publishes to Docker Hub, deploys to CapRover, and creates a GitHub Release.
  4. The Makefile automatically waits and verifies the deployed marker (`https://marcopeg.com/deployment-<TAG>.txt`) unless `SKIP_DEPLOYMENT_VERIFY=1` is specified.

## Local Development

- **Local Port**: `4000` (default, configurable via `PORT` environment variable; accessible at `http://localhost:4000`)
- **Start Dev Server**:
  ```bash
  npm run dev
  # or
  make dev
  ```
- **Domain & Tunnel Support**:
  - The dev server accepts hosts matching `*.42go.dev` (and `42go.dev`) via Cloudflare tunnel (configured under `server.allowedHosts` in [`astro.config.mjs`](astro.config.mjs)).

## Other Common Commands

- **Production Build**: `npm run build` or `make build`
- **Preview Build**: `npm run preview` or `make preview`
- **Install Dependencies**: `npm install` or `make install`
