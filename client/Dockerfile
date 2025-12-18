# Usa Node 18
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Porta padrão do React
EXPOSE 3000

# Inicia em modo de desenvolvimento
CMD ["npm", "start"]