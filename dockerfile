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

ENV DATABASE_URL="postgres://postgres.uwwosfcacyovhelyelwl:EzzOps21@21@aws-0-us-west-1.pooler.supabase.com:5432/postgres"
ENV ACCESS_TOKEN_SECRET_KEY=fc0066fdbfd78d2091ce6a50d9e026254d444cd477cbd44b2b6782d713458c269804026a0090ead274ddf0e0eacb2bcaa910af5d7263bcabedcbf38f582fd3bf
ENV ACCESS_TOKEN_SECRET_REFRESH_KEY=fc0066fdbfd78d2091ce6a50d9e026254d444cd477cbd44b2b6782d713458c269804026a0090ead274ddf0e0eacb2bcaa910af5d7263bcabedcbf38f582fd3bf
ENV SESSION_SECRET=145f757a28e44eca967b62a6d839f6a2d6dd8de727b64b1b8013a9453a3a299410fd3944b99c519e29b2f49c0aae27fa562d2772b85799895a2db9412d9fd755
ENV OWNER_USER_APP=muhamedemadeldeen00@gmail.com
ENV OWNER_PASSWORD_APP=iaiqubhmlldpunjj
ENV PROJECT_URL=https://uwwosfcacyovhelyelwl.supabase.co
ENV PROJECT_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3d29zZmNhY3lvdmhlbHllbHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwNDk2OTAsImV4cCI6MjAyNjYyNTY5MH0.ESLIvD0IUEhSHQrpJQIkbOSOKQZ0LvltniDjIXnxow4
RUN npx prisma generate 

EXPOSE 3005

CMD ["dist/index.js"]
