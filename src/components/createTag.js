import React from "react";
import { Badge, Input } from "reactstrap";
import Octicon, { Plus } from "@githubprimer/octicons-react";
import PropTypes from "prop-types";

const ENTER = 13;

const CreateTag = (props) => {
    const onKeyPress = (event) => {
        if (event.which === ENTER) {
            props.confirm();
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
        <Badge color="primary" onClick={props.open}>
            <Octicon icon={Plus} height="12" verticalAlign="text-top" />
        </Badge>
    );
};

CreateTag.propTypes = {
};

export default CreateTag;
