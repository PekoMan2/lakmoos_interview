FROM node:23-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./
RUN npm install

COPY ./backend ./

COPY ./wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

RUN npx prisma generate

RUN npx tsc -p ./tsconfig.json

EXPOSE 3000

COPY ./backend/start.sh /start.sh
RUN chmod +x /start.sh

CMD ["sh", "/start.sh"]
