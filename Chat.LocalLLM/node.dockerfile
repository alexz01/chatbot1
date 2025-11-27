FROM node:22-alpine AS builder

WORKDIR /app

COPY ./src ./src
COPY package*.json ./
COPY esbuild.config.js ./
COPY tsconfig.json ./
COPY tsoa.json ./

RUN npm install
RUN npm run build

FROM node:22-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build
COPY package*.json ./
RUN npm ci --omit=dev

CMD ["node", "dist/server.js"]
