FROM node:20-alpine

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy only lockfiles first (better caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy rest of the app
COPY . .

# Build Next.js
RUN pnpm build

EXPOSE 3000

# Start production server
CMD ["pnpm", "start"]
