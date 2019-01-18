import React from "react";
import { Button } from "reactstrap";
import Octicon, { Sync } from "@githubprimer/octicons-react";
import PropTypes from "prop-types";

const ReloadButton = ({ onClick }) => (
    <Button onClick={onClick}>
        <Octicon icon={Sync} className="mr-1" />
        Reload files
    </Button>
);

ReloadButton.propTypes = {
    onClick: PropTypes.func,
};

export default ReloadButton;
