import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Tag from "../layout/tag";
import PropTypes from "prop-types";
import RemoveTag from "./removeTag";

const TagsContainer = (props) => {
    return props.tags.map((tag, index) => (
        <Draggable draggableId={"tag-" + tag.path + tag.name} index={index} key={index}>
            {(provided) => (
                <span
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Tag color={tag.color}>
                        {tag.name}
                        <RemoveTag name={tag.name} path={props.path} />
                    </Tag>
                </span>
            )}
        </Draggable>
    ));
};

TagsContainer.propTypes = {
    path: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape(Tag.propTypes)),
};

export default TagsContainer;
