FROM cgr.dev/chainguard/node:latest-dev AS builder
USER root

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate && \
    npm run build

FROM cgr.dev/chainguard/node:latest
USER root

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./


RUN npx prisma generate 

EXPOSE 3005

CMD ["dist/index.js"]
