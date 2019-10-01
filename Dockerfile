FROM node:carbon

# Создать директорию app
WORKDIR /app

# Скопировать исходники приложения
COPY / /app/

RUN npm install

# Собрать статические файлы react/vue/angular
# RUN npm run build

# Установить зависимости приложения
# RUN npm -g install serve

# Используется при обслуживании статических файлов
CMD [ "npm", "start" ]
EXPOSE 3000