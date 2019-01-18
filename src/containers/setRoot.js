import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../reducer";
import { Mutation } from "react-apollo";
import queries from "../queries";
import SetRoot from "../components/setRoot";
import { catchLoadingError } from "./util";

const SetRootContainer = (props) => (
    <Mutation
        mutation={queries.CHANGE_ROOT}
        variables={{
            folder: props.root
        }}
        update={props.confirm}
        refetchQueries={[{
            query: queries.GET_FILES,
        }, {
            query: queries.GET_TAG_GROUPS
        }]}
    >
        {(setRoot, state) => catchLoadingError(state, true)(
            <SetRoot
                isOpen={props.isOpen}
                root={props.root}
                open={props.open}
                abort={props.abort}
                change={props.change}
                confirm={setRoot}
            />
        )}
    </Mutation>
);

SetRootContainer.propTypes = {
    root: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    open: PropTypes.func.isRequired,
    abort: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
};

export default connect(
    (state) => ({
        root: state.config.root,
        isOpen: state.config.rootOpened
    }),
    (dispatch) => ({
        open: () => dispatch({
            type: actions.CONFIG_ROOT_OPEN,
        }),
        abort: () => dispatch({
            type: actions.CONFIG_ROOT_ABORT,
        }),
        change: (root) => dispatch({
            type: actions.CONFIG_ROOT_CHANGE,
            root,
        }),
        confirm: () => dispatch({
            type: actions.CONFIG_ROOT_CONFIRM,
        })
    })
)(SetRootContainer);
