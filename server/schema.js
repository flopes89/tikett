const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type File {
        name: String!
        tags: [Tag]!
        path: String!
        isFile: Boolean
    }

    type TagGroup {
        name: String!
        color: String!
        tags: [Tag]!
    }

    type Tag {
        name: String!
        color: String!
    }

    type Query {
        tagGroups: [TagGroup]!

        files(
            current: String = "/"
            showDescendants: Boolean = false
        ): [File]!
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

        renameTag(
            tag: String!
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

        renameTagGroup(
            group: String!
            name: String!
        ): Boolean!

        removeTagGroup(
            group: String!
        ): Boolean!

        moveTag(
            tag: String!
            group: String!
        ): Boolean!
    }
`);
