# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install all dependencies, including devDependencies
RUN npm install

# Copy the rest of the application source code
# A .dockerignore file is recommended to exclude node_modules, etc.
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist

# Copy the server.json for the mock API
COPY server.json ./

# Expose the ports for the frontend (3000) and the API (3333)
EXPOSE 3000
EXPOSE 3333

# Command to start both servers
# Starts json-server in the background and then serves the static files using npx
CMD ["sh", "-c", "npm run server & npx serve -s dist -l 3000"]