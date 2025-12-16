# Stage 1: Build the application
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN npx nx build datatable-api --prod

# Stage 2: Run the application
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist/datatable-api .
COPY --from=builder /app/datatable-api/prisma ./datatable-api/prisma
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod
RUN npm run prisma:generate
COPY datatable-api/entrypoint.sh .
RUN chmod +x ./entrypoint.sh
EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "main.js"]
