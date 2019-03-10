import React from "react";
import { Badge } from "reactstrap";
import PropTypes from "prop-types";

const HEX_COLOR_PATTERN = new RegExp(/#?(\w{2})(\w{2})(\w{2})/);

const getFontColor = (background) => {
    const rgb = HEX_COLOR_PATTERN.exec(background);
    let brightness = 255;

    if (rgb) {
        brightness = Math.round((
            (parseInt(rgb[1], 16) * 299) +
            (parseInt(rgb[2], 16) * 587) +
            (parseInt(rgb[3], 16) * 114)) / 1000);
    }

    return (brightness > 125) ? "black" : "white";
};

const Tag = ({ children, color }) => (
    <Badge style={{ backgroundColor: color, color: getFontColor(color) }}>
        {children}
    </Badge>
);

Tag.propTypes = {
    color: PropTypes.string,
    children: PropTypes.any,
};

export default Tag;
