import React from "react";
import { Input } from "reactstrap";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import Icon, { Inbox } from "@githubprimer/octicons-react";
import { connect } from "react-redux";
import { toggleRoot, changeRoot } from "../state/config";
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
        }, {
            query: queries.GET_CONFIG,
        }]}
    >
        {(setRoot, state) => catchLoadingError(state, true)(<SetRoot {...props} confirm={setRoot} />)}
    </Mutation>
);

export default connect(
    (state) => ({
        root: state.config.newRoot,
        isOpen: state.config.rootOpen,
    }),
    (dispatch) => ({
        open: () => dispatch(toggleRoot()),
        abort: () => dispatch(toggleRoot()),
        change: (root) => dispatch(changeRoot(root)),
        confirm: () => dispatch(toggleRoot()),
    })
)(SetRootContainer);
