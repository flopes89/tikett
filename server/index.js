const path = require("path");
const express = require("express");
const graphqlHttp = require("express-graphql");
const db = require("./db");

const run = () => {
    const app = express();

    app.use(express.static(path.resolve(__dirname, "..", "public")));

    app.use("/graphql", (req, res, next) => {
        console.log(">>> new graphql request");
        db.reload();
        return next();
    });

    app.use("/graphql", graphqlHttp({
        schema: require("./schema"),
        rootValue: require("./resolvers"),
        graphiql: true,
        formatError: (error) => {
            console.error(error);
            return {
                message: error.message,
                locations: error.locations,
                stack: error.stack ? error.stack.split('\n') : [],
                path: error.path,
            };
        },
        extensions: () => {
            db.dump();
            console.log("<<< graphql request done");
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
