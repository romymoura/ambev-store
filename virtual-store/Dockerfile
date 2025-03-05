# =============================
# Fase 1 - Construção do Angular
# =============================
FROM node:18-alpine AS build

WORKDIR /app

# Copia os arquivos do projeto
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia todo o código-fonte
COPY . .

# Compila a aplicação Angular
#RUN npm run build --prod
RUN npm run build-docker

# =============================
# Fase 2 - Servindo com Nginx
# =============================
FROM nginx:1.23-alpine

# Copia os arquivos do build Angular para a pasta do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80 para acesso à aplicação
EXPOSE 4300

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
