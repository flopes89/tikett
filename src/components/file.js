import React from "react";
import Octicon, { FileDirectory, File as FileIcon } from "@githubprimer/octicons-react";
import PropTypes from "prop-types";
import Tag from "../layout/tag";
import AddTag from "./addTag";
import Tags from "./tags";
import { Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { selectFile } from "../state/files";
import classnames from "classnames";

const renderFile = (provided, snapshot, props) => {
    const classes = classnames("file_tags", {
        "drop_ready": props.isDragging,
        "drag_over": snapshot.isDraggingOver,
    });

    return (
        <div ref={provided.innerRef} {...provided.droppableProps} className={classes}>
            <Tags path={props.path} tags={props.tags} />
            <AddTag path={props.path} />
            {provided.placeholder}
        </div>
    );
};

const File = (props) => {
    if (!props.isFile) {
        return (
            <tr className="folder" onClick={() => props.openFolder(props.name)}>
                <td><Octicon icon={FileDirectory} /> [{props.name}]</td>
                <td>&nbsp;</td>
            </tr>
        );
    }

    return (
        <tr className={"file " + (props.isSelected ? "selected" : "")}>
            <td onClick={() => props.select(props.path)}>
                <Octicon icon={FileIcon} /> {props.name}
            </td>
            <td>
                <Droppable droppableId={"file|" + props.path} direction="horizontal">
                    {(provided, snapshot) => renderFile(provided, snapshot, props)}
                </Droppable>
            </td>
        </tr>
    );
};

File.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    isFile: PropTypes.bool.isRequired,
    openFolder: PropTypes.func,
    tags: PropTypes.arrayOf(PropTypes.shape(Tag.propTypes)),
    select: PropTypes.func,
};


const FileContainer = connect(
    (state, props) => ({
        isDragging: state.global.isDraggingTag,
        isSelected: state.files.selected === props.path,
    }),
    (dispatch) => ({
        select: (path) => dispatch(selectFile(path)),
    }),
)(File);

export default FileContainer;
