const path = require("path");
const express = require("express");
const graphqlHttp = require("express-graphql");
const db = require("./db");

const run = () => {
    const app = express();

    app.use(express.static(path.resolve(__dirname, "..", "public")));

    app.use("/graphql", (req_, res_, next_) => {
        db.reload();
        return next_();
    });

    app.use("/graphql", graphqlHttp({
        schema: require("./schema"),
        rootValue: require("./resolvers"),
        graphiql: true,
        formatError: (error_) => ({
            message: error_.message,
            locations: error_.locations,
            stack: error_.stack ? error_.stack.split('\n') : [],
            path: error_.path
        }),
        extensions: () => {
            db.dump();
            return {
                lastDbUpdate: new Date().toISOString(),
            };
        }
    }));

    app.listen(process.env.PORT, () => {
        console.log(`Running server on ${process.env.PORT}`);
        db.reloadFiles();
        db.dump();
    });
};

module.exports = {
    run,
};
