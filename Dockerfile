FROM node:14.4

COPY . /app
WORKDIR /app
RUN npm install && npm run build
ENTRYPOINT npm start 
ENV PORTDOCKER=3000
EXPOSE 3000