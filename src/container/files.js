import gql from "graphql-tag";
import { graphql } from "react-apollo";
import queryStateBlocker from "./queryStateBlocker";
import { compose } from "recompose";
import Files from "../components/files"

export default compose(
    graphql(gql`
        {
            files {
                name
                tags {
                    name
                    color
                }
                path
                isFile
            }
        }
    `),
    queryStateBlocker(),
)(Files);
