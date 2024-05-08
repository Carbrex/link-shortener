FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Install app dependencies
COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY client/package.json ./client/package.json
COPY client/pnpm-lock.yaml ./client/pnpm-lock.yaml
COPY server/package.json ./server/package.json
COPY server/pnpm-lock.yaml ./server/pnpm-lock.yaml

RUN pnpm install

# Bundle app source
COPY . .

# Build the app
RUN cd client && pnpm run build
RUN cd server && pnpm run build

# Expose the port
EXPOSE 3000

# Start the app
WORKDIR /app/server
CMD ["pnpm", "start"]