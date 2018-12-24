import React from "react";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";

const SetRoot = (props) => {
    if (props.isOpen) {
        return null;
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
        <a href="#">
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
