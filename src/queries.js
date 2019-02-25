import gql from "graphql-tag";

export default {
    GET_CONFIG: gql`
        query {
            config {
                root
            }
        }`,

    GET_FILES: gql`
        query(
            $current: String = "/"
            $showDescendants: Boolean = false
            $filters: [String] = []
        ) {
            files(
                current: $current
                showDescendants: $showDescendants
                filters: $filters
            ) {
                name
                tags {
                    name
                    color
                }
                path
                isFile
            }
        }`,

    RELOAD_FILES: gql`
        mutation reload {
            reload
        }`,

    GET_TAG_GROUPS: gql`
        query {
            tagGroups {
                name
                color
                tags
            }
        }`,

    CREATE_TAG_GROUP: gql`
        mutation createTagGroup(
            $name: String!
        ) {
            createTagGroup(
                name: $name
            )
        }`,

    REMOVE_TAG_GROUP: gql`
        mutation removeTagGroup(
            $group: String!
        ) {
            removeTagGroup(
                group: $group
            )
        }`,

    ADD_TAG: gql`
        mutation addTag(
            $path: String!
            $name: String!
        ) {
            addTag(
                path: $path
                name: $name
            )
        }`,

    REMOVE_TAG: gql`
        mutation removeTag(
            $path: String!
            $name: String!
        ) {
            removeTag(
                path: $path
                name: $name
            )
        }`,

    CHANGE_ROOT: gql`
        mutation changeRoot(
            $folder: String!
        ) {
            changeRoot(
                folder: $folder
            )
        }`,

    MOVE_TAG: gql`
        mutation moveTag(
            $tag: String!
            $group: String!
        ) {
            moveTag(
                tag: $tag
                group: $group
            )
        }
    `,

    CHANGE_COLOR: gql`
        mutation changeColor(
            $group: String!
            $color: String!
        ) {
            changeColor(
                group: $group
                color: $color
            )
        }
    `,

    GET_TAGS: gql`
        query {
            tags
        }
    `,

    GET_FILTERS: gql`
        query {
            filters
        }
    `,

    GET_FOLDERS: gql`
        query(
            $current: String = "/"
        ) {
            folders(
                current: $current
            )
        }
    `,
};
