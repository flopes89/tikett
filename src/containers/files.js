import React from "react";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Files from "../components/files"
import queries from "../queries";
import { Loading, Error } from "./util";
import * as actions from "../reducer";

const FilesContainer = (props) => {
    return (
        <Query
            query={queries.GET_FILES}
            variables={{
                current: props.current,
                showDescendants: props.showDescendants,
            }}
        >
            {({ loading, error, data }) => {
                if (loading) return <Loading />;
                if (error) return <Error />;
                return (
                    <Files
                        files={data.files}
                        openFolder={props.openFolder}
                        showDescendants={props.showDescendants}
                        toggleShowDescendants={props.toggleShowDescendants}
                    />
                );
            }}
        </Query>
    );
};

FilesContainer.propTypes = {};

export default connect(
    (state_) => ({
        showDescendants: state_.files.showDescendants,
        current: state_.files.current,
    }),
    (dispatch_) => ({
        toggleShowDescendants: () => dispatch_({
            type: actions.FILES_TOGGLE_SHOWDESCENDANTS,
        }),
        openFolder: (folder_) => dispatch_({
            type: actions.FILES_NAVIGATE,
            folder: folder_,
        }),
    }),
)(FilesContainer);
