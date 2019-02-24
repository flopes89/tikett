import React from "react";
import { Mutation } from "react-apollo";
import queries from "../queries";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { catchLoadingError } from "./util";
import Octicon, { Trashcan } from "@githubprimer/octicons-react";
import { selectFile } from "../state/files";

const RemoveTag = (props) => {
    const remove = (mutate) => {
        props.resetSelectedFile();
        mutate();
    };

    return (
        <Mutation
            mutation={queries.REMOVE_TAG}
            variables={{
                name: props.name,
                path: props.path,
            }}
            refetchQueries={[
                {
                    query: queries.GET_FILES,
                    variables: {
                        current: props.current,
                        showDescendants: props.showDescendants,
                    }
                }
            ]}
        >
            {(mutate, state) => catchLoadingError(state)(
                <a href="#" onClick={() => remove(mutate)}>
                    <Octicon icon={Trashcan} height={12} verticalAlign="middle" />
                </a>
            )}
        </Mutation>
    );
};

RemoveTag.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    current: PropTypes.string.isRequired,
    showDescendants: PropTypes.bool.isRequired,
    resetSelectedFile: PropTypes.func,
};

export default connect(
    (state) => ({
        current: state.fileBrowser.currentFolder,
        showDescendants: state.fileBrowser.showDescendants,
    }),
    (dispatch) => ({
        resetSelectedFile: () => dispatch(selectFile("")),
    })
)(RemoveTag);
