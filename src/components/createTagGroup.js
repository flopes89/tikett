import React from "react";
import { Button, Input } from "reactstrap";
import Octicon, { Plus } from "@githubprimer/octicons-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import * as actions from "../reducer";
import queries from "../queries";
import { catchLoadingError } from "./util";
import { CONFIRM_KEYS } from "../const";

const CreateTagGroup = (props) => {
    const onKeyPress = (event) => {
        if (CONFIRM_KEYS.indexOf(event.which) !== -1) {
            props.confirm();
        }
    };

    return (
        <div id="create_new_tag_group">
            {props.isOpen && (
                <Input
                    innerRef={(ref) => ref && ref.focus()}
                    value={props.name}
                    onChange={(event) => props.change(event.target.value)}
                    onBlur={props.abort}
                    onKeyPress={onKeyPress}
                    placeholder="Press enter to confirm"
                />
            )}
            {!props.isOpen && (
                <Button size="sm" color="primary" onClick={props.open}>
                    <Octicon icon={Plus} className="mr-1" />
                    Create tag group
                </Button>
            )}
        </div>
    );
};

CreateTagGroup.propTypes = {
    isOpen: PropTypes.bool,
    name: PropTypes.string,
    open: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    abort: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
};

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
        {(createGroup, state) => catchLoadingError(state)(<CreateTagGroup {...props} confirm={createGroup} />)}
    </Mutation>
);

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
