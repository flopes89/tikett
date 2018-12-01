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
            $showAllChildren: Boolean = false 
        ) {
            files(
                current: $current
                showAllChildren: $showAllChildren
            ) {
                ${FILES}
            }
        }
    `,

    RELOAD_FILES: gql`
        mutation reload(
            $current: String = "./"
            $showAllChildren: Boolean = false
        ) {
            reload(
                current: $current
                showAllChildren: $showAllChildren
            ) {
                ${FILES}
            }
        }
    `,
};
