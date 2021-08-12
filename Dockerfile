FROM node:14

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# para conseguir rodar o wait-for
RUN apt-get -q update && apt-get -qy install netcat

# Create app directory
WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 80
CMD [ "node", "src/index.js" ]