# Build stage
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy source code
COPY . .

# Build server and client
RUN echo "Building server..." && \
    npm run build:server && \
    echo "Server build complete. Checking dist directory:" && \
    ls -la dist/server && \
    echo "Checking if index.js exists:" && \
    ls -la dist/server/index.js && \
    echo "Building client..." && \
    npm run build:client && \
    echo "Client build complete. Checking dist directory:" && \
    ls -la dist

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies and type definitions
RUN npm install --production && \
    npm install --save-dev @types/node @types/express @types/cors @types/mongoose

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "dist/server/index.js"] 