import React from "react";
import { Input } from "reactstrap";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";

const ENTER = 13;

const SetRoot = (props) => {
    if (props.isOpen) {
        const onKeyPress = (event) => {
            if (event.which === ENTER) {
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

    let root = props.root;
    if (!props.root) {
        root = (
            <Alert color="danger">
                No root folder set. Click here to set one now
            </Alert>
        );
    }

    return (
        <a href="#" onClick={props.open}>
            {root}
        </a>
    );
};

SetRoot.propTypes = {
    isOpen: PropTypes.bool,
    open: PropTypes.func,
    abort: PropTypes.func,
    change: PropTypes.func,
    confirm: PropTypes.func,
    root: PropTypes.string,
};

export default SetRoot;
