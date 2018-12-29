const path = require("path");
const express = require("express");
const graphqlHttp = require("express-graphql");
const db = require("./db");
const bodyParser = require("body-parser");
const net = require("net");
const config = require("./config");

const LOG = require("./logger")("server");

const run = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.static(path.resolve(__dirname, "..", "public")));

    app.use("/graphql", (req, res, next) => {
        LOG.silly(">>> New GraphQL request", req.body);
        db.reload();
        return next();
    });

    app.use("/graphql", graphqlHttp({
        schema: require("./schema"),
        rootValue: require("./resolvers"),
        graphiql: true,
        formatError: (error) => {
            LOG.error(error);
            return {
                message: error.message,
                locations: error.locations,
                stack: error.stack ? error.stack.split('\n') : [],
                path: error.path,
            };
        },
        extensions: () => {
            db.dump();
            LOG.silly("<<< Finished GraphQL request");
            return {
                lastDbUpdate: new Date().toISOString(),
            };
        }
    }));

    const port = await findRandomOpenPort();

    app.listen(port, () => {
        LOG.info(`Running server on ${port}`);
        db.init(config.getRoot());
        db.reloadFiles();
        db.dump();
    });

    return port;
};

const findRandomOpenPort = () => new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "development") {
        resolve(50550);
        return;
    }

    const server = net.createServer();
    server.unref();
    server.on("error", reject);

    server.listen(0, () => {
        const { port } = server.address();

        server.close(() => {
            resolve(port);
        });
    });
});

module.exports = {
    run,
};
