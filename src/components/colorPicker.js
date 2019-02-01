import React from "react";
import { SketchPicker } from "react-color";
import PropTypes from "prop-types";

const ColorPicker = (props) => {
    return (
        <SketchPicker disableAlpha={true} onChangeComplete={props.onChange} color={props.color} />
    )
};

ColorPicker.propTypes = {
    onChange: PropTypes.func,
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default ColorPicker;
