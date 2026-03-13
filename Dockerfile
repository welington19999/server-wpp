FROM node:18-slim

# Instalar dependências do sistema necessárias para o Puppeteer/WhatsApp
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    procps \
    libxss1 \
    libnss3 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libasound2 \
    && rm -rf /var/lib/apt/lists/*

# Criar diretório da aplicação
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências do Node
RUN npm install

# Copiar o resto do código
COPY . .

# Criar diretórios para persistência de dados
RUN mkdir -p /app/whatsapp-session /app/media

# Expor a porta que seu app usa (geralmente 3000)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]