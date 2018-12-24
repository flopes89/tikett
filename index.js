const server = require("./server");
const config = require("./server/config");
const opn = require("opn");

config.load();

server.run().then((port) => {
    if (process.env.NODE_ENV === "production") {
        opn("http://localhost:" + port);
    }
});
