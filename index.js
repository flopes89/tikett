const server = require("./server");
const config = require("./server/config");
const opn = require("opn");

config.load();

server.run().then((port) => opn("http://localhost:" + port));
