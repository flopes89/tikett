import React from "react";
import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import RemoveTag from "./removeTag";

const HEX_COLOR_PATTERN = new RegExp(/#?(\w{2})(\w{2})(\w{2})/);

const getContrastColor = (background) => {
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

export const Tag = (props) => (
    <Badge style={{
        backgroundColor: props.color,
        color: getContrastColor(props.color)
    }}>
        {props.children}
    </Badge>
);

Tag.propTypes = {
    children: PropTypes.node,
    color: PropTypes.string,
};

const Tags = (props) => props.tags.map((tag, index) => {
    let color = props.color;
    let path = "";
    let name = tag;

    if (typeof tag === "object") {
        color = tag.color;
        name = tag.name;
    }

    path = props.path;

    const id = `${name}|${color}|${path}`;

    return (
        <Draggable draggableId={id} index={index} key={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="tag"
                >
                    <Tag color={color}>
                        {name}
                        {path && (<RemoveTag name={name} path={path} />)}
                    </Tag>
                </div>
            )}
        </Draggable>
    )
});

Tags.propTypes = {
    path: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    color: PropTypes.string,
};

export default Tags;
