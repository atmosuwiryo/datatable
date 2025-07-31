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
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod
EXPOSE 3000
CMD ["node", "main.js"]
