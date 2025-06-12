FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get upgrade -y && apt-get install -y curl git && rm -rf /var/lib/apt/lists/*


RUN corepack enable && corepack prepare pnpm@latest --activate

COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

COPY . .

CMD ["pnpm", "dev"]
