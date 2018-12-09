import gql from "graphql-tag";

const FILES = `
    name
    tags {
        name
        color
    }
    path
    isFile`;

const TAG_GROUPS = `
    name
    color
    tags {
        name
        color
    }`;

const TAGS = `
    name
    color
`;

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
                ${FILES}
            }
        }`,

    RELOAD_FILES: gql`
        mutation reload {
            reload
        }`,

    GET_TAG_GROUPS: gql`
        query {
            tagGroups {
                ${TAG_GROUPS}
            }
        }`,

    CREATE_TAG_GROUP: gql`
        mutation createTagGroup(
            $name: String!
        ) {
            createTagGroup(
                name: $name
            ) {
                ${TAG_GROUPS}
            }
        }`,

    REMOVE_TAG_GROUP: gql`
        mutation removeTagGroup(
            $group: String!
        ) {
            removeTagGroup(
                group: $group
            ) {
                ${TAG_GROUPS}
            }
        }`,

    ADD_TAG: gql`
        mutation addTag(
            $name: String!
        ) {
            addTag(
                name: $name
            ) {
                ${FILES}
            }
        }`,
};
