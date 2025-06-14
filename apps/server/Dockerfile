FROM node:20-slim

RUN apt-get update && apt-get upgrade -y && apt-get install -y curl git && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@latest --activate

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

RUN pnpm add -g turbo biome

CMD ["bash"]
