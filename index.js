process.env.FILE_ROOT = "test/data";

const server = require("./server");
const opn = require("opn");

server.run().then((port) => opn("http://localhost:" + port));
