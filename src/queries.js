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
            $sort: String = "nameAsc"
            $current: String = "./"
            $showAllChildren: Boolean = false 
        ) {
            files(
                sort: $sort
                current: $current
                showAllChildren: $showAllChildren
            ) {
                ${FILES}
            }
        }
    `,

    RELOAD_FILES: gql`
        mutation reload(
            $sort: String = "nameAsc"
            $current: String = "./"
            $showAllChildren: Boolean = false
        ) {
            reload(
                sort: $sort
                current: $current
                showAllChildren: $showAllChildren
            ) {
                ${FILES}
            }
        }
    `,
};
