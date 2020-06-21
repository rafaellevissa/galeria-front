FROM node:14.4

COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT  npm run build && npm start 
ENV PORTDOCKER=3000
EXPOSE 3000