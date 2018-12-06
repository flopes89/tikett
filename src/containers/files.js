import React from "react";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Files from "../components/files"
import queries from "../queries";
import { catchLoadingError } from "./util";
import * as actions from "../reducer";

const FilesContainer = (props) => (
    <Query
        query={queries.GET_FILES}
        variables={{
            current: props.current,
            showDescendants: props.showDescendants,
        }}
    >
        {(state) => catchLoadingError(state)(
            <Files {...props} files={state.data.files} />
        )}
    </Query>
);

FilesContainer.propTypes = {
    showDescendants: PropTypes.bool.isRequired,
    current: PropTypes.string.isRequired,
    toggleShowDescendants: PropTypes.func.isRequired,
    openFolder: PropTypes.func.isRequired,
};

export default connect(
    (state) => ({
        showDescendants: state.files.showDescendants,
        current: state.files.current,
    }),
    (dispatch) => ({
        toggleShowDescendants: () => dispatch({
            type: actions.FILES_TOGGLE_SHOWDESCENDANTS,
        }),
        openFolder: (folder) => dispatch({
            type: actions.FILES_OPENFOLDER,
            folder,
        }),
    }),
)(FilesContainer);
