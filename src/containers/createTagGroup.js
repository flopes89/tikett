import React from "react";
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import CreateTagGroup from "../components/createTagGroup";
import * as actions from "../reducer";
import queries from "../queries";
import { Loading, Error } from "./util";

const CreateTagGroupContainer = (props_) => {
    const update = (cache_, { data: { createTagGroup } }) => {
        cache_.writeQuery({
            query: queries.GET_TAG_GROUPS,
            data: {
                tagGroups: createTagGroup,
            }
        });
        props_.confirm();
    };

    return (
        <Mutation mutation={queries.CREATE_TAG_GROUP} update={update} variables={{ name: props_.name }}>
            {(createTagGroup_, { loading, error }) => {
                if (loading) return <Loading />;
                if (error) return <Error />;
                return <CreateTagGroup {...props_} confirm={createTagGroup_} />;
            }}
        </Mutation>
    );
};

export default connect(
    (state_) => ({
        isOpen: Boolean(state_.tagGroups.createNewOpened),
        name: state_.tagGroups.createNewName,
    }),
    (dispatch_) => ({
        open: () => dispatch_({
            type: actions.OPEN_CREATE_NEW_TAG_GROUP_INPUT,
        }),
        confirm: () => dispatch_({
            type: actions.CONFIRM_CREATE_NEW_TAG_GROUP_INPUT,
        }),
        abort: () => dispatch_({
            type: actions.ABORT_CREATE_NEW_TAG_GROUP_INPUT,
        }),
        change: (name_) => dispatch_({
            type: actions.CHANGE_CREATE_NEW_TAG_GROUP_INPUT,
            name: name_,
        }),
    }),
)(CreateTagGroupContainer);
