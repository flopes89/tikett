import React from "react";
import { Input } from "reactstrap";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import Icon, { Inbox } from "@githubprimer/octicons-react";

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

export default SetRoot;
