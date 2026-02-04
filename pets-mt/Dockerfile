# Multi-stage build para otimizar o tamanho final
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY vitest.config.ts ./
COPY eslint.config.js ./

# Instalar dependências
RUN npm ci

# Copiar código-fonte
COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./

# Build da aplicação
RUN npm run build

# Stage final - imagem de produção
FROM node:20-alpine

WORKDIR /app

# Instalar apenas dependências de produção
COPY package*.json ./
RUN npm ci --only=production && \
    npm install -g serve

# Copiar arquivos de build do stage anterior
COPY --from=builder /app/dist ./dist

# Criar diretório para health check script
RUN mkdir -p /app/scripts
COPY scripts/healthcheck.js ./scripts/healthcheck.js

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000

# Expor porta
EXPOSE 3000

# Health check - verifica se a aplicação está respondendo
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node /app/scripts/healthcheck.js || exit 1

# Comando padrão para iniciar a aplicação
CMD ["serve", "-s", "dist", "-l", "3000"]
