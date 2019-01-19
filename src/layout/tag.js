import React from "react";
import { Badge } from "reactstrap";
import PropTypes from "prop-types";

const Tag = ({ children, color }) => (
    <Badge className="tag" style={{ backgroundColor: color }}>
        {children}
    </Badge>
);

Tag.propTypes = {
    color: PropTypes.string,
    children: PropTypes.any,
};

export default Tag;
