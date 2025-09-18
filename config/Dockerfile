# Multi-stage build for production deployment
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN npm ci --only=production && npm cache clean --force
RUN cd backend && npm ci --only=production && npm cache clean --force
RUN cd frontend && npm ci --only=production && npm cache clean --force

# Build frontend
FROM base AS frontend-builder
WORKDIR /app/frontend

# Copy frontend package files and install all dependencies (including devDependencies)
COPY frontend/package*.json ./
RUN npm ci

# Copy frontend source code
COPY frontend/ .

# Build frontend for production
RUN npm run build

# Backend production image
FROM base AS backend
WORKDIR /app

# Copy backend dependencies
COPY --from=deps /app/backend/node_modules ./backend/node_modules
COPY --from=deps /app/node_modules ./node_modules

# Copy backend source code
COPY backend/ ./backend/
COPY package*.json ./

# Create uploads directory
RUN mkdir -p backend/uploads/images

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S futurist -u 1001

# Change ownership of the app directory
RUN chown -R futurist:nodejs /app
USER futurist

# Expose port
EXPOSE 5001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node backend/healthcheck.js || exit 1

# Start backend server
CMD ["npm", "run", "start:backend"]

# Full production image with both frontend and backend
FROM nginx:alpine AS production

# Install Node.js for backend
RUN apk add --no-cache nodejs npm

# Copy backend
COPY --from=backend /app /app

# Copy built frontend to nginx
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy startup script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose ports
EXPOSE 80 5001

# Health check for full stack
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost/ && curl -f http://localhost:5001/ || exit 1

# Start both frontend and backend
ENTRYPOINT ["/docker-entrypoint.sh"]
