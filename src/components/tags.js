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
    return props.tags.map((tag, index) => (
        <Draggable draggableId={"tag|" + props.path + "|" + tag.name} index={index} key={index}>
            {(provided, snapshot) => (
                <React.Fragment>
                    <span
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Tag {...tag} {...props} />
                    </span>
                    {snapshot.isDragging && (<Tag {...tag} {...props} />)}
                </React.Fragment>
            )}
        </Draggable>
    ));
};

Tag.propTypes = LayoutTag.propTypes;

TagsContainer.propTypes = {
    path: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape(LayoutTag.propTypes)),
};

export default TagsContainer;
