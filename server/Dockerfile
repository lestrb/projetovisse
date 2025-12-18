# Usa uma imagem leve do Node 18 (mesma versão do CI)
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências primeiro (para aproveitar o cache do Docker)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o resto do código fonte
COPY . .

# Expõe a porta
EXPOSE 3002

# Inicia o servidor
CMD ["npm", "start"]