#!/bin/sh
set -e

mkdir -p /app/data

npx prisma migrate deploy

if [ ! -f /app/data/.seeded ]; then
  npx tsx prisma/seed.ts
  touch /app/data/.seeded
fi

exec node server.js
