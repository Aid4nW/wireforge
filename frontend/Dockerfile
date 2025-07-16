FROM node:20-alpine AS base

# 1. Install dependencies
FROM base AS deps
WORKDIR /app
RUN apk add --no-cache build-base cairo-dev jpeg-dev pango-dev giflib-dev
COPY package.json package-lock.json ./ 
RUN npm ci
RUN npm install canvas

# 2. Build the Next.js application
FROM base AS builder
WORKDIR /app
RUN apk add --no-cache cairo libjpeg-turbo pango giflib
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3. Run the Next.js application
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN apk add --no-cache cairo libjpeg-turbo pango giflib

COPY --from=builder /app .

EXPOSE 3000
CMD ["npm", "run", "start"]