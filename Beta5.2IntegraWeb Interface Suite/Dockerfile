# -----------------------------------------------------------------------------
# Dockerfile
# Purpose: Build and serve the React app with Nginx on port 8080 (Cloud Run).
# Notes:
# - Multi-stage: builder uses Node; final uses Nginx for static assets.
# - Adjust "COPY --from=build /app/dist ..." if your build output folder differs.
# -----------------------------------------------------------------------------

# 1) Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
# Use npm ci if lockfile exists, else npm install
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy source
COPY . .

# Build for production
# This uses your existing scripts (e.g., npm run build).
# For esbuild environment: "npm run build" calls "node scripts/build.mjs --production"
RUN npm run build

# 2) Serve stage
FROM nginx:1.27-alpine

# Nginx listens on 8080 for Cloud Run (do not change)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output
# If your output is not "dist", change this path accordingly.
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]