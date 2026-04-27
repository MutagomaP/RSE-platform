FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN rm -rf node_modules package-lock.json && npm install

COPY . .
RUN npm run build


FROM node:20-alpine AS runner
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main"]