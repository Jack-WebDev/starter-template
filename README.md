# Full-Stack Turbo Monorepo Starter

A modern, batteries-included **monorepo starter** powered by **Turborepo**, designed for speed, type safety, and excellent developer experience.

Ideal for building **scalable full-stack applications** with clean architecture, blazing-fast builds, and cutting-edge tools.

---

## Stack Overview

### Tooling & DX

- **Turborepo** – Monorepo orchestration with smart caching
- **pnpm** – Fast, disk-efficient package manager
- **Docker Compose** – Consistent development environments
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

---

## Folder Structure

```txt
.
├── apps
│   ├── web      # Next.js frontend app
│   └── server   # Fastify backend server
├── packages     # Shared code
├── docker-compose # Docker-related configs and services
├── .github      # GitHub Actions workflows
├── .biome.json  # Biome formatter & linter config
├── turbo.json   # Turborepo pipeline configuration
└── README.md
