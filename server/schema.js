const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Config {
        root: String!
    }

    type File {
        name: String!
        tags: [Tag]!
        path: String!
        isFile: Boolean
    }

    type TagGroup {
        name: String!
        color: String!
        tags: [String]!
    }

    type Tag {
        name: String!
        color: String!
    }

    type Query {
        config: Config!

        tagGroups: [TagGroup]!

        files(
            current: String = "/"
            showDescendants: Boolean = false
            filters: [String]!
        ): [File]!

        tags: [String]!

        folders(
            current: String = "/"
        ): [String]!
    }

    type Mutation {
        changeRoot(
            folder: String!
        ): Boolean!

        reload: Boolean!

        addTag(
            path: String!
            name: String!
        ): Boolean!

        removeTag(
            path: String!
            name: String!
        ): Boolean!

        createTag(
            name: String!
        ): Boolean!

        deleteTag(
            tag: String!
        ): Boolean!

        createTagGroup(
            name: String!
        ): Boolean!

        removeTagGroup(
            group: String!
        ): Boolean!

        moveTag(
            tag: String!
            group: String!
        ): Boolean!

        changeColor(
            group: String!
            color: String!
        ): Boolean!
    }
`);
