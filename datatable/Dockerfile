# Stage 1: Build the application
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN npx nx build datatable --prod

# Stage 2: Serve the application
FROM nginx:alpine
COPY --from=builder /app/dist/datatable /usr/share/nginx/html
COPY datatable/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]