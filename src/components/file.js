import React from "react";
import Octicon, { FileDirectory, File } from "@githubprimer/octicons-react";
import PropTypes from "prop-types";
import Tag from "./tag";
import CreateTag from "./createTag";

const FileComponent = (props) => {
    let name = props.name;
    let icon = (<Octicon icon={File} />);
    let className = "file";
    let onClick = null;

    if (!props.isFile) {
        name = "[" + name + "]";
        icon = (<Octicon icon={FileDirectory} />);
        className = "folder";
        onClick = () => props.openFolder(props.name);
    }

    return (
        <tr className={className} onClick={onClick}>
            <td>
                {icon}
            </td>
            <td>
                {name}
            </td>
            <td>
                {props.isFile && props.tags.map((tag, index) => (
                    <Tag key={index} color={tag.color}>{tag.name}</Tag>
                ))}
                {props.isFile && (<CreateTag />)}
            </td>
        </tr>
    );
};

FileComponent.propTypes = {
    name: PropTypes.string.isRequired,
    isFile: PropTypes.bool.isRequired,
    openFolder: PropTypes.func,
    tags: PropTypes.arrayOf(PropTypes.shape(Tag.propTypes)),
};

export default FileComponent;
