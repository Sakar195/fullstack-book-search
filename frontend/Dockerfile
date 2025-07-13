
FROM node:20-alpine AS base
WORKDIR /app


FROM base AS deps
COPY package*.json ./
RUN npm ci


FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app


RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs


COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder /app/.next/static ./.next/static


USER nextjs


EXPOSE 3000


CMD ["npm", "start"]