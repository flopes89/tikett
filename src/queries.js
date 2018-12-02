import gql from "graphql-tag";

const FILES = `
    name
    tags {
        name
        color
    }
    path
    isFile
`;

export default {
    GET_FILES: gql`
        query(
            $current: String = "./"
            $showDescendants: Boolean = false 
        ) {
            files(
                current: $current
                showDescendants: $showDescendants
            ) {
                ${FILES}
            }
        }
    `,

    RELOAD_FILES: gql`
        mutation reload(
            $current: String = "./"
            $showDescendants: Boolean = false
        ) {
            reload(
                current: $current
                showDescendants: $showDescendants
            ) {
                ${FILES}
            }
        }
    `,

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
        }
    `,
};
