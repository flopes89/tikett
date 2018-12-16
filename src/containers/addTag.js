import React from "react";
import { Mutation } from "react-apollo";
import queries from "../queries";
import AddTag from "../components/addTag";
import { connect } from "react-redux";
import * as actions from "../reducer";
import { catchLoadingError } from "./util";

const AddTagContainer = (props) => (
    <Mutation
        mutation={queries.ADD_TAG}
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
            },
            {
                query: queries.GET_TAG_GROUPS,
            }
        ]}
        update={props.confirm} >
        {(addTag, state) => catchLoadingError(state)(
            <AddTag {...props} confirm={addTag} />
        )}
    </Mutation>
);

export default connect(
    (state, props) => ({
        name: state.files.createNewTagName,
        isOpen: state.files.createNewTagOpened && (state.files.createNewTagOnPath === props.path),
        current: state.files.current,
        showDescendants: state.files.showDescendants,
    }),
    (dispatch) => ({
        open: (path) => dispatch({
            type: actions.FILES_NEWTAG_OPEN,
            path
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
    }),
)(AddTagContainer);
