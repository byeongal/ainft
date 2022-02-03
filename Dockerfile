FROM node:16.13.2-alpine

ARG PORT=3000
ENV PORT="${PORT}"

COPY . /app
WORKDIR /app

RUN npm install

EXPOSE "${PORT}"

CMD ["npm", "start"]