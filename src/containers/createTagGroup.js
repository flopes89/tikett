import React from "react";
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import CreateTagGroup from "../components/createTagGroup";
import * as actions from "../reducer";
import queries from "../queries";
import { Loading, Error } from "./util";

const CreateTagGroupContainer = (props) => {
    const update = (cache, { data: { createTagGroup } }) => {
        cache.writeQuery({
            query: queries.GET_TAG_GROUPS,
            data: {
                tagGroups: createTagGroup,
            }
        });
        props.confirm();
    };

    return (
        <Mutation mutation={queries.CREATE_TAG_GROUP} update={update} variables={{ name: props.name }}>
            {(createTagGroup_, { loading, error }) => {
                if (loading) return <Loading />;
                if (error) return <Error />;
                return <CreateTagGroup {...props} confirm={createTagGroup_} />;
            }}
        </Mutation>
    );
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
