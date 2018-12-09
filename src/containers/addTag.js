import React from "react";
import { Mutation } from "react-apollo";
import queries from "../queries";
import AddTag from "../components/addTag";
import { connect } from "react-redux";
import * as actions from "../reducer";
import { catchLoadingError } from "./util";

const AddTagContainer = (props) => {
    const update = (cache, { data: { addTag } }) => {
        cache.writeQuery({
            query: queries.GET_FILES,
            data: {
                files: addTag,
            }
        });
        props.confirm();
    };

    return (
        <Mutation mutation={queries.ADD_TAG} update={update} variables={{
            name: props.name,
            file: props.file,
            current: props.current,
            showDescendants: props.showDescendants,
        }}>
            {(addTag, state) => catchLoadingError(state)(
                <AddTag {...props} confirm={addTag} />
            )}
        </Mutation>
    );
};

export default connect(
    (state) => ({
        current: state.files.current,
        showDescendants: state.files.showDescendants,
        isOpen: Boolean(state.files.createNewTagOpened),
        name: state.files.createNewTagName,
    }),
    (dispatch) => ({
        open: (file) => dispatch({
            type: actions.FILES_NEWTAG_OPEN,
            file
        }),
        confirm: () => dispatch({
            type: actions.FILES_NEWTAG_CONFIRM,
        }),
        abort: () => dispatch({
            type: actions.FILES_NEWTAG_ABORT,
        }),
        change: (name) => dispatch({
            type: actions.FILES_NEWTAG_CHANGE,
            name,
        }),
    })
)(AddTagContainer);
