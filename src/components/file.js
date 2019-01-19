import React from "react";
import Octicon, { FileDirectory, File as FileIcon } from "@githubprimer/octicons-react";
import PropTypes from "prop-types";
import Tag from "../layout/tag";
import AddTag from "./addTag";
import Tags from "./tags";
import { Droppable } from "react-beautiful-dnd";

const File = (props) => {
    let name = props.name;
    let icon = (<Octicon icon={FileIcon} />);
    let className = "file";
    let onClick = null;

    if (!props.isFile) {
        name = "[" + name + "]";
        icon = (<Octicon icon={FileDirectory} />);
        className = "folder";
        onClick = () => props.openFolder(props.name);
    }

    return (
        <Droppable droppableId={"tags-container-" + props.path}>
            {(provided) => (
                <tr
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={className}
                    onClick={onClick}
                >
                    <td>{icon}</td>
                    <td>{name}</td>
                    <td>
                        {props.isFile && (<Tags path={props.path} tags={props.tags} />)}
                        {props.isFile && (<AddTag path={props.path} />)}
                    </td>
                </tr>
            )}
        </Droppable>
    );
};

File.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    isFile: PropTypes.bool.isRequired,
    openFolder: PropTypes.func,
    tags: PropTypes.arrayOf(PropTypes.shape(Tag.propTypes)),
};

export default File;
