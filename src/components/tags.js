import React from "react";
import { Draggable } from "react-beautiful-dnd";
import LayoutTag from "../layout/tag";
import PropTypes from "prop-types";
import RemoveTag from "./removeTag";

const TagsContainer = (props) => props.tags.map((tag, index) => {
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
                    <LayoutTag color={color}>
                        {name}
                        {path && (<RemoveTag name={name} path={path} />)}
                    </LayoutTag>
                </div>
            )}
        </Draggable>
    )
});

TagsContainer.propTypes = {
    path: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
    color: PropTypes.string,
};

export default TagsContainer;
