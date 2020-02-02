import React, { KeyboardEvent } from "react";
import Octicon, { FileDirectory, File as FileIcon } from "@primer/octicons-react";
import { Tags } from "../tags";
import { Droppable, DroppableProps } from "react-beautiful-dnd";
import classnames from "classnames";
import { useFileBrowserState } from "../../state/fileBrowser";
import { useDragState } from "../../state/drag";
import { AddTag } from "./addTag";
import { Tag } from "../../model";

type FileProps = {
    name: string;
    path: string;
    isFile: boolean;
    tags: Tag[];
};

export const File: React.FC<FileProps> = (props) => {
    const { selectFile, selected, openFolder } = useFileBrowserState();
    const { isDraggingTag } = useDragState();

    const isSelected = selected === props.path;

    if (!props.isFile) {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                openFolder(props.name);
            }
        };

        return (
            <tr className="folder" onClick={() => openFolder(props.name)} onKeyDown={onKeyDown} tabIndex={0}>
                <td><Octicon icon={FileDirectory} /> [{props.name}]</td>
                <td>&nbsp;</td>
            </tr>
        );
    }

    const renderFile: DroppableProps["children"] = (provided, snapshot) => {
        const classes = classnames("file_tags", {
            "drop_ready": isDraggingTag,
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
        "selected": isSelected,
    });

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            selectFile(props.path);
            return false;
        }
    };

    return (
        <tr className={classes} tabIndex={0} onKeyDown={onKeyDown}>
            <td onClick={() => selectFile(props.path)}>
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
