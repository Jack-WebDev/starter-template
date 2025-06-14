# Full-Stack Turbo Monorepo Starter

A modern, batteries-included **monorepo starter** powered by **Turborepo**, designed for speed, type safety, and excellent developer experience.

Ideal for building **scalable full-stack applications** with clean architecture, blazing-fast builds, and cutting-edge tools.

---

## Stack Overview

### Tooling & DX

- **Turborepo** – Monorepo orchestration with smart caching
- **pnpm** – Fast, disk-efficient package manager
- **Docker Compose** – Consistent development environments
- **Docker Compose** – Multi-service dev environments
- **Dev Containers** – Reproducible coding environment via VS Code
- **GitHub Actions** – Automated CI/CD pipelines
- **Husky** – Git hooks for pre-commit checks
- **Biome** – Super-fast formatter, linter, and code quality tool

### Frontend

- **Next.js 15** – React framework with SSR, routing, and API support
- **Tailwind CSS** – Utility-first CSS framework
- **shadcn/ui** – Customizable and accessible UI components
- **Playwright** – E2E testing framework
- **Vitest** – Unit and component testing with Vite speed

### Backend

- **Fastify** – High-performance, low overhead web framework
- **tRPC** – End-to-end typesafe APIs
- **Drizzle ORM** – Type-safe SQL query builder and migrations
- **Zod** – Type-safe schema validation

## Dev Services via Docker Compose

Includes fast, modern local services for fullstack development:

- **PostgreSQL** (with PostGIS) – primary database
- **KeyDB** – high-performance Redis alternative
- **Mailpit** – modern email testing tool
- **Uptrace** – distributed tracing and APM (OpenTelemetry-compatible)
- **Meilisearch** – fast, developer-friendly search engine
- **MinIO** – S3-compatible object storage

## Packages

- **Builkit** - Shared build configuration
- **Utils** – Shared utility functions
- **UI** – Shadcn UI components
- **TS** – Shared TypeScript configuration
- **Testkit** – Shared test configuration

> All services are managed in `compose.yml`.

---

## Folder Structure

```txt
.
├── apps/
│   ├── web/       # Next.js frontend
│   └── server/    # Fastify + tRPC backend
├── packages/      # Shared logic (types, utils, UI, etc.)
├── .devcontainer/ # Dev Container config for VS Code
├── docker-compose.yml
├── Dockerfile     # Root-level dev container environment (pnpm, biome, turbo)
├── turbo.json     # Turborepo config
├── .biome.json    # Biome config (replaces Prettier + ESLint)
├── .github/       # GitHub Actions workflows
└── README.md
