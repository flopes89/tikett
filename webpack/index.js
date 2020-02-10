
const env = process.env.NODE_ENV;
const clientConfig = require(`./client.${env}`);
const serverConfig = require(`./server.${env}`);

const configs = [];
configs.push(clientConfig);
configs.push(serverConfig);

module.exports = configs;
