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
        reload: Boolean!

        addTag(
            file: String!
            tag: String!
        ): File!

        removeTag(
            file: String!
            tag: String!
        ): File!

        renameTag(
            tag: String!
            name: String!
        ): Tag!

        createTag(
            name: String!
        ): Tag!

        deleteTag(
            tag: String!
        ): Boolean!

        createTagGroup(
            name: String!
        ): [TagGroup]!

        renameTagGroup(
            group: String!
            name: String!
        ): TagGroup!

        removeTagGroup(
            group: String!
        ): [TagGroup]!

        moveTag(
            tag: String!
            group: String!
        ): TagGroup!
    }
`);
