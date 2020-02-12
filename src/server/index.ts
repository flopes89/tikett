import path from "path";
import fs from "fs-extra";
import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import { createLogger } from "./logger";
import { apiRouter } from "./api";
import net from "net";
import { resolvers } from "./resolver";
import { buildSchema } from "graphql";
import { load, persist } from "./db";
import open from "open";

const LOG = createLogger("server");

const findRandomOpenPort = (): Promise<string> => new Promise((res, rej) => {
    if (process.env.NODE_ENV === "development") {
        res("50550");
        return;
    }

    const server = net.createServer();
    server.unref();
    server.on("error", rej);

    server.listen(0, () => {
        const { port } = server.address() as net.AddressInfo;

        server.close(() => {
            res(port.toString());
        });
    });
});

const run = async(): Promise<string> => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.static(path.resolve(__dirname)));

    // Load the current db state into memory before every graphql request
    app.use("/graphql", async(req, res, next) => {
        await load();
        return next();
    });

    const schema = await fs.readFile(path.resolve(__dirname, "schema.gql"));

    const apolloServer = new ApolloServer({
        typeDefs: schema.toString(),
        resolvers,
        introspection: process.env.NODE_ENV === "development",
        playground: process.env.NODE_ENV === "development",
    });

    apolloServer.applyMiddleware({
        app,
        path: "/graphql"
    });

    // Persist the (probably modifier) db state after each graphql request
    app.use("/graphql", async(req, res, next) => {
        await persist();
        return next();
    });

    const port = process.env.PORT || await findRandomOpenPort();

    app.listen(port, () => {
        LOG.info(`Running server on ${port}`);
    });

    app.use("/api", apiRouter);

    return port;
};

run().then((port) => {
    LOG.info("Running tikett %s", process.env.BUILD_INFO);

    if (process.env.NODE_ENV === "production") {
        open("http://localhost:" + port);
    }
});
