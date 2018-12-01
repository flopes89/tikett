const path = require("path");
const express = require("express");
const graphqlHttp = require("express-graphql");

const run = () => {
    const app = express();

    app.use(express.static(path.resolve(__dirname, "..", "public")));

    app.use("/graphql", graphqlHttp({
        schema: require("./schema"),
        rootValue: require("./resolvers"),
        graphiql: true,
    }));

    app.listen(process.env.PORT, () => console.log(`Running server on ${process.env.PORT}`));
};

module.exports = {
    run,
};
