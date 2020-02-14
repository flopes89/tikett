import React, { useState, KeyboardEvent, useEffect, useRef, ChangeEvent } from "react";
import { Row, Col, Input } from "reactstrap";
import Octicon, { Trashcan, Pencil } from "@primer/octicons-react";
import { Tags } from "../tags";
import { Droppable, DroppableProps } from "react-beautiful-dnd";
import { ColorPicker } from "./colorPicker";
import classnames from "classnames";
import { useDragState } from "../../state/drag";
import { GqlTagGroup, useRemoveTagGroupMutation, TagGroupsDocument, useRenameTagGroupMutation } from "../../../generated/graphql";
import { Loading } from "../util";

type TagGroupProps = {
    group: GqlTagGroup;
};

export const TagGroup: React.FC<TagGroupProps> = (props) => {
    const [removeGroup, { loading: loadingRemove }] = useRemoveTagGroupMutation();
    const [renameGroup, { loading: loadingRename }] = useRenameTagGroupMutation();
    const { isDraggingTag } = useDragState();
    const [newName, setNewName] = useState(props.group.name);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const renderTagGroup: DroppableProps["children"] = (provided, snapshot) => {
        const classes = classnames("tag_group", {
            "drop_ready": isDraggingTag,
            "drag_over": snapshot.isDraggingOver,
        });
    
        return (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={classes}
            >
                <Tags tags={props.group.tags} />
                {provided.placeholder}
            </div>
        );
    };

    const remove = async() => {
        await removeGroup({
            variables: {
                group: props.group.name,
            },
            refetchQueries: [{
                query: TagGroupsDocument,
            }]
        });
    };
    
    const onKeyDown = async(event: KeyboardEvent) => {
        event.persist();

        if (event.key === "Enter" && isEditing) {
            await renameGroup({
                variables: {
                    group: props.group.name,
                    newName,
                },
                refetchQueries: [{
                    query: TagGroupsDocument,
                }]
            });
            setIsEditing(false);
        }

        if (event.key === "Escape") {
            setIsEditing(false);
            setNewName(props.group.name);
        }
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    };
    
    if (loadingRemove) {
        return <Loading />;
    }

    let nameComponent: React.ReactNode = <strong>{props.group.name}</strong>;
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

    if (loadingRename) {
        nameComponent = <Loading />;
    }

    return (
        <>
            <Row>
                <Col>
                    {nameComponent}
                    &nbsp;
                    <ColorPicker group={props.group} />
                    &nbsp;
                    <a className="icon" onClick={() => setIsEditing(!isEditing)}>
                        <Octicon icon={Pencil} />
                    </a>
                    &nbsp;
                    <a className="icon" onClick={remove}>
                        <Octicon icon={Trashcan} />
                    </a>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Droppable droppableId={"tagGroup|" + props.group.name}>
                        {(provided, snapshot) => renderTagGroup(provided, snapshot)}
                    </Droppable>
                </Col>
            </Row>
        </>
    );
};
