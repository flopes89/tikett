import React from "react";
import { Draggable } from "react-beautiful-dnd";
import LayoutTag from "../layout/tag";
import PropTypes from "prop-types";
import RemoveTag from "./removeTag";

const Tag = (props) => (
    <LayoutTag color={props.color}>
        {props.name}
        {props.path && (<RemoveTag name={props.name} path={props.path} />)}
    </LayoutTag>
);

const TagsContainer = (props) => {
    return props.tags.map((tag, index) => {
        let tagObject = tag;

        if (typeof tagObject === "string") {
            tagObject = {
                name: tag,
                color: props.color,
            };
        }

        tagObject.path = props.path;

        return (
            <Draggable draggableId={"tag|" + props.path + "|" + tagObject.name} index={index} key={index}>
                {(provided, snapshot) => (
                    <React.Fragment>
                        <span
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <Tag {...tagObject} />
                        </span>
                        {snapshot.isDragging && (<Tag {...tagObject} />)}
                    </React.Fragment>
                )}
            </Draggable>
        )
    });
};

Tag.propTypes = LayoutTag.propTypes;

TagsContainer.propTypes = {
    path: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
    color: PropTypes.string,
};

export default TagsContainer;
