import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Tag from "../layout/tag";
import PropTypes from "prop-types";
import RemoveTag from "./removeTag";

const DraggableTag = (props) => {
    return (
        <Draggable draggableId={"draggable-tag-" + props.path + props.name} index={0}>
            {(provided) => (
                <span
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Tag color={props.color}>
                        {props.name}
                        <RemoveTag name={props.name} path={props.path} />
                    </Tag>
                </span>
            )}
        </Draggable>
    )
};

const TagsContainer = (props) => {
    return (
        <Droppable droppableId={"tags-container-" + props.path}>
            {(provided) => (
                <span ref={provided.innerRef} {...provided.droppableProps}>
                    {props.tags.map((tag, index) => (
                        <DraggableTag
                            key={index}
                            name={tag.name}
                            path={props.path}
                            color={tag.color}
                        />
                    ))}
                </span>
            )}
        </Droppable>
    );
};

TagsContainer.propTypes = {
    path: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape(Tag.propTypes)),
};

export default TagsContainer;
