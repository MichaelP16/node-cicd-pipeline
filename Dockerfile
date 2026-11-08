# Imagen de producción ligera
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY src ./src
COPY public ./public
ENV PORT=5501
EXPOSE 5501
USER node
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:5501/health || exit 1
CMD ["node", "src/server.js"]
