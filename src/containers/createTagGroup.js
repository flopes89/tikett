import React from "react";
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import CreateTagGroup from "../components/createTagGroup";
import PropTypes from "prop-types";
import * as actions from "../reducer";
import queries from "../queries";
import { catchLoadingError } from "./util";

const CreateTagGroupContainer = (props) => (
    <Mutation
        mutation={queries.CREATE_TAG_GROUP}
        variables={{
            name: props.name
        }}
        update={props.confirm}
        refetchQueries={[
            {
                query: queries.GET_TAG_GROUPS,
            }
        ]}>
        {(createGroup, state) => catchLoadingError(state)(
            <CreateTagGroup
                isOpen={props.isOpen}
                name={props.name}
                open={props.open}
                abort={props.abort}
                change={props.change}
                confirm={createGroup}
            />
        )}
    </Mutation>
);

CreateTagGroupContainer.propTypes = {
    isOpen: PropTypes.bool,
    name: PropTypes.string,
    open: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    abort: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
};

export default connect(
    (state) => ({
        isOpen: Boolean(state.tagGroups.createNewOpened),
        name: state.tagGroups.createNewName,
    }),
    (dispatch) => ({
        open: () => dispatch({
            type: actions.NEWTAGGROUP_OPEN,
        }),
        confirm: () => dispatch({
            type: actions.NEWTAGGROUP_CONFIRM,
        }),
        abort: () => dispatch({
            type: actions.NEWTAGGROUP_ABORT,
        }),
        change: (name) => dispatch({
            type: actions.NEWTAGGROUP_CHANGE,
            name,
        }),
    }),
)(CreateTagGroupContainer);
