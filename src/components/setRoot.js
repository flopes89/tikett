import React from "react";
import { Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import Icon, { Inbox } from "@githubprimer/octicons-react";
import { connect } from "react-redux";
import { toggleRoot, changeRoot } from "../state/config";
import { Mutation } from "react-apollo";
import queries from "../queries";
import { catchLoadingError } from "./util";
import { CONFIRM_KEYS } from "../const";
import FolderSelection from "./folderSelection";

const SetRoot = (props) => {
    const onKeyPress = (event) => {
        if (CONFIRM_KEYS.indexOf(event.which) !== -1) {
            props.confirm(props.root);
        }
    };

    return (
        <React.Fragment>
            <Button onClick={props.open}>
                <Icon icon={Inbox} /> Change root
            </Button>
            <Modal isOpen={props.isOpen} toggle={props.abort}>
                <ModalHeader toggle={props.abort}>
                    <Icon icon={Inbox} /> Select new root folder
                    </ModalHeader>
                <ModalBody>
                    <FolderSelection />
                </ModalBody>
            </Modal>
        </React.Fragment>
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
