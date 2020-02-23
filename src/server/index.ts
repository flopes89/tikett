import path from "path";
import fs from "fs-extra";
import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import { createLogger } from "./logger";
import { apiRouter } from "./api";
import net from "net";
import { resolvers } from "./resolver";
import { load } from "./db";

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

    const port = process.env.PORT || await findRandomOpenPort();

    app.listen(port, () => {
        LOG.info(`Running server on :${port}`);
    });

    app.use("/api", apiRouter);

    return port;
};

run().then(port => {
    LOG.info("Running tikett %s", process.env.BUILD_INFO);

    if (process.env.NODE_ENV === "production") {
        console.log("");
        console.log("## tikett has started. Open your browser and navigate to the following address:");
        console.log("##");
        console.log("## http://localhost:" + port + "/");
        console.log("");
    }
});
