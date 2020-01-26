import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Octicon, { Trashcan } from "@githubprimer/octicons-react";
import { useDragState } from "../../state/drag";

export const RemoveTag: React.FC = (props) => {
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
            {(mutate) => (
                <a className="remove_tag ml-2" href="#" onClick={() => remove(mutate)} tabIndex="-1">
                    <Octicon icon={Trashcan} size={12} verticalAlign="middle" />
                </a>
            )}
        </Mutation>
    );
};

RemoveTag = connect(
    (state) => ({
        current: state.fileBrowser.currentFolder,
        showDescendants: state.fileBrowser.showDescendants,
    }),
    (dispatch) => ({
        resetSelectedFile: () => dispatch(selectFile("")),
    })
)(RemoveTag);

RemoveTag.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export default RemoveTag;