import React from "react";
import Octicon, { FileDirectory, File as FileIcon } from "@githubprimer/octicons-react";
import PropTypes from "prop-types";
import AddTag from "./addTag";
import Tags from "../tags";
import { Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { selectFile } from "../../state/files";
import classnames from "classnames";

const File = (props) => {
    if (!props.isFile) {
        return (
            <tr className="folder" onClick={() => props.openFolder(props.name)}>
                <td><Octicon icon={FileDirectory} /> [{props.name}]</td>
                <td>&nbsp;</td>
            </tr>
        );
    }

    const renderFile = (provided, snapshot) => {
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

    const classes = classnames("file", {
        "selected": props.isSelected,
    });

    return (
        <tr className={classes}>
            <td onClick={() => props.select(props.path)}>
                <Octicon icon={FileIcon} /> {props.name}
            </td>
            <td>
                <Droppable droppableId={"file|" + props.path} direction="horizontal">
                    {renderFile}
                </Droppable>
            </td>
        </tr>
    );
};

const FileContainer = connect(
    (state, props) => ({
        isDragging: state.global.isDraggingTag,
        isSelected: state.files.selected === props.path,
    }),
    (dispatch) => ({
        select: (path) => dispatch(selectFile(path)),
        openFolder: (folder) => dispatch(openFolder(folder)),
    }),
)(File);

FileContainer.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    isFile: PropTypes.bool.isRequired,
};

export default FileContainer;
