import React from "react";
import Octicon, { FileDirectory, File as FileIcon } from "@githubprimer/octicons-react";
import PropTypes from "prop-types";
import Tag from "../layout/tag";
import AddTag from "./addTag";
import Tags from "./tags";
import { Droppable } from "react-beautiful-dnd";

const File = (props) => {
    if (!props.isFile) {
        return (
            <tr className="folder" onClick={() => props.openFolder(props.name)}>
                <td><Octicon icon={FileDirectory} /></td>
                <td>[{props.name}]</td>
                <td>&nbsp;</td>
            </tr>
        );
    }

    return (
        <Droppable droppableId={"file|" + props.path}>
            {(provided) => (
                <tr
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="file"
                >
                    <td>{<Octicon icon={FileIcon} />}</td>
                    <td>{props.name}</td>
                    <td>
                        <Tags path={props.path} tags={props.tags} />
                        {provided.placeholder}
                        <AddTag path={props.path} />
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
