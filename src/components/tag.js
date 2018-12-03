import React from "react";
import { Badge } from "reactstrap";
import PropTypes from "prop-types";

const Tag = ({ children, color }) => (
    <Badge className="tag" style={{ backgroundColor: color }}>
        {children}
    </Badge>
);

Tag.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};

export default Tag;
