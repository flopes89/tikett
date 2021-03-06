import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import Octicon, { File as FileIcon, FileDirectory, Search, Trashcan, Pencil } from "@primer/octicons-react";
import { Tags } from "../tags";
import { Droppable, DroppableProps } from "react-beautiful-dnd";
import classnames from "classnames";
import { useFileBrowserState } from "../../state/fileBrowser";
import { useDragState } from "../../state/drag";
import { AddTag } from "./addTag";
import { Input } from "reactstrap";
import { useRemoveFileMutation, useRenameFileMutation } from "../../../generated/graphql";
import { Loading } from "../util";
import { useRefetchFilesQuery } from "../../util";

type RemoveFileProps = {
    path: string;
};

const RemoveFile: React.FC<RemoveFileProps> = (props) => {
    const { selectFile } = useFileBrowserState();
    const refetchFilesQuery = useRefetchFilesQuery();
    const [removeFile, { loading }] = useRemoveFileMutation({
        variables: {
            path: props.path,
        },
        refetchQueries: [refetchFilesQuery]
    });

    if (loading) {
        return <Loading />;
    }

    const remove = async() => {
        selectFile("");
        await removeFile();
    };

    return (
        <a className="icon" onClick={() => remove()}>
            <Octicon icon={Trashcan} />
        </a>
    );
};

type FileProps = {
    name: string;
    path: string;
    isFile: boolean;
    tags: string[];
};

export const File: React.FC<FileProps> = (props) => {
    const { selectFile, selected, openFolder } = useFileBrowserState();
    const { isDraggingTag } = useDragState();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(props.name);
    const inputRef = useRef<HTMLInputElement>(null);
    const refetchFilesQuery = useRefetchFilesQuery();
    const [renameFile, { loading }] = useRenameFileMutation({
        refetchQueries: [refetchFilesQuery]
    });

    const isSelected = selected === props.path;

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    if (!props.isFile) {
        return (
            <tr className="folder" onClick={() => openFolder(props.name)}>
                <td><Octicon icon={FileDirectory} /></td>
                <td>[{props.name}]</td>
                <td>&nbsp;</td>
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
                <AddTag path={props.name} />
                {provided.placeholder}
            </div>
        );
    };

    const classes = classnames("file", {
        "selected": isSelected,
    });

    const onKeyDown = async(event: KeyboardEvent) => {
        event.persist();
        event.stopPropagation();

        if (event.key === "Enter" && isEditing) {
            await renameFile({
                variables: {
                    path: props.path,
                    newName,
                }
            });
            setIsEditing(false);
        }

        if (event.key === "Escape") {
            setIsEditing(false);
            setNewName(props.name);
        }
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    };
    
    const toggleSelect = () => {
        if (isSelected) {
            selectFile("");
        } else {
            selectFile(props.path);
        }
    };

    let nameComponent: React.ReactNode = props.name;
    if (isEditing) {
        nameComponent = (
            <Input
                innerRef={inputRef}
                type="text"
                value={newName}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        );
    }

    if (loading) {
        nameComponent = <Loading />;
    }

    return (
        <tr className={classes} onKeyDown={onKeyDown}>
            <td>
                <Octicon icon={FileIcon} />
            </td>
            <td className="break">
                {nameComponent}
            </td>
            <td>
                <Droppable droppableId={"file|" + props.path} direction="horizontal">
                    {renderFile}
                </Droppable>
            </td>
            <td>
                <a className="icon" onClick={toggleSelect}>
                    <Octicon icon={Search} />
                </a>
                &nbsp;
                <a className="icon" onClick={() => setIsEditing(!isEditing)}>
                    <Octicon icon={Pencil} />
                </a>
                &nbsp;
                <RemoveFile path={props.path} />
            </td>
        </tr>
    );
};
