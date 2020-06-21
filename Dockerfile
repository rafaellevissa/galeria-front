FROM node:14.4

COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT npm start && npm run build
ENV PORTDOCKER=3000
EXPOSE 3000