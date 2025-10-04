FROM node:22

WORKDIR /app

ENV NODE_OPTIONS=--max-old-space-size=2048

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
