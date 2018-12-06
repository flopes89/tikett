import React from "react";
import { Button, Input } from "reactstrap";
import Octicon, { Plus } from "@githubprimer/octicons-react";
import PropTypes from "prop-types";

const ENTER = 13;

const CreateTagGroup = (props) => {
    const onKeyPress = (event) => {
        if (event.which === ENTER) {
            props.confirm();
        }
    };

    return (
        <div id="create_new_tag_group">
            {props.isOpen && (
                <Input
                    innerRef={(ref) => ref && ref.focus()}
                    value={props.name}
                    onChange={(event) => props.change(event.target.value)}
                    onBlur={props.abort}
                    onKeyPress={onKeyPress}
                    placeholder="Press enter to confirm"
                />
            )}
            {!props.isOpen && (
                <Button size="sm" color="primary" onClick={props.open}>
                    <Octicon icon={Plus} className="mr-1" />
                    Create tag group
            </Button>
            )}
        </div>
    );
};

CreateTagGroup.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    open: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    abort: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
};

export default CreateTagGroup;
