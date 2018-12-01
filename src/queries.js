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
        {
            files {
                ${FILES}
            }
        }
    `,

    RELOAD_FILES: gql`
        mutation reload {
            reload {
                ${FILES}
            }
        }
    `,
};
