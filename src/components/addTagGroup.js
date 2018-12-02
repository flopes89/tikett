import React from "react";
import { Button } from "reactstrap";
import Octicon, { Plus } from "@githubprimer/octicons-react";
import PropTypes from "prop-types";

const AddTagGroup = (props_) => (
    <Button size="sm" color="primary" onClick={props_.open}>
        <Octicon icon={Plus} className="mr-1" />
        Create tag group
    </Button>
);

AddTagGroup.propTypes = {
    isOpen: PropTypes.bool.isRequired,
};

export default AddTagGroup;
