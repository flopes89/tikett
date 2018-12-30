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
    isOpen: PropTypes.bool,
    open: PropTypes.func,
    abort: PropTypes.func,
    change: PropTypes.func,
    confirm: PropTypes.func,
    root: PropTypes.string,
};

export default SetRoot;
