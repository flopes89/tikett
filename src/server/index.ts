import path from "path";
import { promises as fs } from "fs";
import express from "express";
import bodyParser from "body-parser";
import graphqlHttp from "express-graphql";
import { createLogger } from "./logger";
import { apiRouter } from "./api";
import net from "net";
import { resolvers } from "./resolver";
import { buildSchema } from "graphql";
import { persist, load } from "./db";
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

    app.use(express.static(path.resolve(__dirname, "public")));

    app.use("/graphql", (req, res, next) => {
        LOG.silly(">>> New GraphQL request", req.body);
        load();
        return next();
    });

    const schema = await fs.readFile(path.resolve(__dirname, "./schema.gql"));

    app.use("/graphql", graphqlHttp({
        schema: buildSchema(schema.toString()),
        rootValue: resolvers,
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
            LOG.silly("<<< Finished GraphQL request");
            persist();
            return {
                lastDbUpdate: new Date().toISOString(),
            };
        }
    }));

    const port = process.env.PORT || await findRandomOpenPort();

    app.listen(port, () => {
        LOG.info(`Running server on ${port}`);
    });

    app.use("/api", apiRouter);

    return port;
};

run().then((port) => {
    LOG.info("Running tikett %s on port %s", process.env.BUILD_INFO, port);

    if (process.env.NODE_ENV === "production") {
        open("http://localhost:" + port);
    }
});
