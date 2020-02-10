import React, { KeyboardEvent, useState, ChangeEvent, useRef, useEffect } from "react";
import Octicon, { FileDirectory, File as FileIcon, Search } from "@primer/octicons-react";
import { Tags } from "../tags";
import { Droppable, DroppableProps } from "react-beautiful-dnd";
import classnames from "classnames";
import { useFileBrowserState } from "../../state/fileBrowser";
import { useDragState } from "../../state/drag";
import { AddTag } from "./addTag";
import { Input } from "reactstrap";
import { useRenameFileMutation } from "../../../generated/graphql";
import { Loading } from "../util";

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
    const [renameFile, { loading }] = useRenameFileMutation();

    const isSelected = selected === props.path;

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    if (!props.isFile) {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                openFolder(props.name);
            }
        };

        return (
            <tr className="folder" onClick={() => openFolder(props.name)} onKeyDown={onKeyDown} tabIndex={0}>
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
                <AddTag path={props.path} />
                {provided.placeholder}
            </div>
        );
    };

    const classes = classnames("file", {
        "selected": isSelected,
    });

    const onKeyDown = async(event: KeyboardEvent) => {
        event.persist();

        if (event.key === "Enter" && isEditing) {
            await renameFile({
                variables: {
                    path: props.path,
                    newName,
                }
            });
            setIsEditing(false);
        }

        if (event.key === "F2") {
            setIsEditing(true);
        }

        if (event.key === "Escape") {
            setIsEditing(false);
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

    if (loading) {
        return <Loading />;
    }

    let nameComponent: React.ReactNode = props.name;
    if (isEditing) {
        nameComponent = <Input innerRef={inputRef} type="text" value={newName} onChange={onChange} />;
    }

    return (
        <tr className={classes} tabIndex={0} onKeyDown={onKeyDown}>
            <td>
                <Octicon icon={FileIcon} />
            </td>
            <td>
                {nameComponent}
            </td>
            <td>
                <Droppable droppableId={"file|" + props.path} direction="horizontal">
                    {renderFile}
                </Droppable>
            </td>
            <td>
                <a onClick={toggleSelect}>
                    <Octicon icon={Search} />
                </a>
            </td>
        </tr>
    );
};
