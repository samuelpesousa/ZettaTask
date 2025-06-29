# Usa uma imagem oficial leve do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia os arquivos de gerenciamento de pacotes
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia o resto dos arquivos do backend para o diretório de trabalho
COPY . .

# Expõe a porta em que a API roda
EXPOSE 3001

# Define o comando padrão para iniciar a aplicação quando o contêiner iniciar
CMD [ "node", "index.js" ]