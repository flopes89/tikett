import React from "react";
import { Button, Input } from "reactstrap";
import Octicon, { Plus } from "@githubprimer/octicons-react";
import PropTypes from "prop-types";

const ENTER = 13;

const AddTagGroup = (props_) => {
    const onKeyPress = (event_) => {
        if (event_.which === ENTER) {
            props_.confirm();
        }
    };

    return (
        <div id="create_new_tag_group">
            {props_.isOpen && (
                <Input
                    innerRef={(ref_) => ref_ && ref_.focus()}
                    value={props_.name}
                    onChange={(event_) => props_.change(event_.target.value)}
                    onBlur={props_.abort}
                    onKeyPress={onKeyPress}
                    placeholder="Press enter to confirm"
                />
            )}
            {!props_.isOpen && (
                <Button size="sm" color="primary" onClick={props_.open}>
                    <Octicon icon={Plus} className="mr-1" />
                    Create tag group
            </Button>
            )}
        </div>
    );
};

AddTagGroup.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    open: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    abort: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
};

export default AddTagGroup;
