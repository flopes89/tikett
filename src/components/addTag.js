import React from "react";
import { Badge, Input } from "reactstrap";
import Octicon, { Plus } from "@githubprimer/octicons-react";
import PropTypes from "prop-types";

const ENTER = 13;

const AddTag = (props) => {
    const onKeyPress = (event) => {
        if (event.which === ENTER) {
            props.confirm(props.file);
        }
    };

    if (props.isOpen) {
        return (
            <Input
                innerRef={(ref) => ref && ref.focus()}
                value={props.name}
                onChange={(event) => props.change(event.target.value)}
                onBlur={props.abort}
                onKeyPress={onKeyPress}
                placeholder="Press enter to confirm"
            />
        );
    }

    return (
        <Badge color="primary" onClick={() => props.open(props.file)}>
            <Octicon icon={Plus} height={12} verticalAlign="text-top" />
        </Badge>
    );
};

AddTag.propTypes = {
    open: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
    abort: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    file: PropTypes.string.isRequired,
};

export default AddTag;
