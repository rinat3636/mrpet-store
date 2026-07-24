FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1

ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_OZON_URL
ARG NEXT_PUBLIC_BASE_PATH
ARG DATABASE_URL

ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_OZON_URL=${NEXT_PUBLIC_OZON_URL}
ENV NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH}
ENV DATABASE_URL=${DATABASE_URL}

RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

RUN chmod +x /app/entrypoint.sh

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
ENV DATABASE_URL=file:./data/dev.db

VOLUME ["/app/data"]

ENTRYPOINT ["/app/entrypoint.sh"]
