import gql from "graphql-tag";

export default {
    GET_FILES: gql`
        query(
            $current: String = "/"
            $showDescendants: Boolean = false 
        ) {
            files(
                current: $current
                showDescendants: $showDescendants
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
                tags {
                    name
                    color
                }
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
};
