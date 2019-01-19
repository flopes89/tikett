import React from "react";
import { Input } from "reactstrap";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import Icon, { Inbox } from "@githubprimer/octicons-react";
import { connect } from "react-redux";
import * as actions from "../reducer";
import { Mutation } from "react-apollo";
import queries from "../queries";
import { catchLoadingError } from "./util";
import { CONFIRM_KEYS } from "../const";

const SetRoot = (props) => {
    if (props.isOpen) {
        const onKeyPress = (event) => {
            if (CONFIRM_KEYS.indexOf(event.which) !== -1) {
                props.confirm(props.root);
            }
        };

        return (
            <Input
                innerRef={(ref) => ref && ref.focus()}
                value={props.root}
                onChange={(event) => props.change(event.target.value)}
                onBlur={props.abort}
                onKeyPress={onKeyPress}
                placeholder="Press enter to confirm"
            />
        );
    }

    return (
        <Button onClick={props.open}>
            <Icon icon={Inbox} /> Change root
        </Button>
    );
};

SetRoot.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    open: PropTypes.func.isRequired,
    abort: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    root: PropTypes.string.isRequired,
};

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
        {(setRoot, state) => catchLoadingError(state, true)(<SetRoot {...props} confirm={setRoot} />)}
    </Mutation>
);

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
