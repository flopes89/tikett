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

        tags(
            group: String
        ): [Tag]!

        files(
            current: String = "./"
            showDescendants: Boolean = false
        ): [File]!
    }

    type Mutation {
        reload(
            current: String = "./"
            showDescendants: Boolean = false
        ): [File]!

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
            newName: String!
        ): Tag!

        createTag(
            tag: String!
        ): Tag!

        deleteTag(
            tag: String!
        ): Boolean!

        createGroup(
            group: String!
        ): TagGroup!

        deleteGroup(
            group: String!
        ): Boolean!

        moveTag(
            tag: String!
            group: String!
        ): TagGroup!
    }
`);
