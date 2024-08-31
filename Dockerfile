FROM node:20-bookworm AS builder

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable
RUN pnpm install --frozen-lockfile

COPY src ./src
COPY tsconfig.json ./
RUN pnpm build

FROM node:20-bookworm AS production

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable
RUN pnpm install --frozen-lockfile --production

RUN pnpm playwright install --with-deps chromium
COPY --from=builder /usr/src/app/dist ./dist

ENV NODE_ENV=production

CMD ["pnpm", "start:prod"]
