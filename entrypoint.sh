#!/bin/sh
set -e

if [ ! -d /app/app/generated/prisma ]; then
  npx prisma generate
fi

mkdir -p /app/data

npx prisma migrate deploy

if [ ! -f /app/data/.seeded ]; then
  npx tsx prisma/seed.ts
  touch /app/data/.seeded
fi

# Prisma engine path for bundled Next.js standalone runtime
ENGINE=$(ls /app/app/generated/prisma/libquery_engine-*.so.node 2>/dev/null | head -n 1)
if [ -n "$ENGINE" ]; then
  export PRISMA_QUERY_ENGINE_LIBRARY="$ENGINE"
fi

exec node server.js
