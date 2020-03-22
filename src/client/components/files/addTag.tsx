import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Badge, Button, ButtonGroup, Input, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Octicon, { Plus, Trashcan } from "@primer/octicons-react";
import { Tag } from "../tags";
import classnames from "classnames";
import { getColorOfTag, useRefetchFilesQuery, useRefetchTagsQuery } from "../../util";
import { useAddTagsMutation, useTagGroupsQuery, useTagsQuery } from "../../../generated/graphql";
import { Loading } from "../util";

type TagListProps = {
    confirm: (tag: string) => void;
};

const TagList: React.FC<TagListProps> = (props) => {
    const { data: tagGroupsQuery } = useTagGroupsQuery();
    const { data: tagsQuery } = useTagsQuery();
    const [typed, setTyped] = useState("");
    const [selected, setSelected] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    
    const displayValue = (selected || typed).split("#")[0];

    useEffect(() => {
        if (!inputRef.current) {
            return;
        }

        inputRef.current.focus();
    }, [inputRef.current]);

    if (!tagsQuery || !tagGroupsQuery) {
        return <Loading />;
    }

    let tags = tagsQuery.tags;
    tags = tags
        .map(tag => tag.toLocaleLowerCase())
        .filter(tag => typed.length >= 3 && tag.indexOf(typed.toLocaleLowerCase()) !== -1);

    const confirm = (tag: string) => {
        props.confirm(tag);
        setTyped("");
        setSelected("");
    };

    const onKeyPress = (event: KeyboardEvent) => {
        if (selected) {
            setTyped(selected);
            setSelected("");
        }
        
        if (event.key === "Enter") {
            confirm(displayValue);
        }
    };

    const onKeyDown = (event: KeyboardEvent) => {
        if (tags.length === 0) {
            return;
        }

        if (event.key === "Backspace" && selected) {
            setTyped(selected);
            setSelected("");
        }

        if (event.key === "ArrowUp") {
            if (selected === "") {
                setSelected(tags[tags.length - 1]);
            } else {
                setSelected(tags[Math.max(tags.indexOf(selected) - 1, 0)]);
            }
        }

        if (event.key === "ArrowDown") {
            if (selected === "") {
                setSelected(tags[0]);
            } else {
                setSelected(tags[Math.min(tags.indexOf(selected) + 1, tags.length - 1)]);
            }
        }
    };

    const renderTag = (tag: string, index: number) => {
        const color = getColorOfTag(tagGroupsQuery.tagGroups, tag);

        const classes = classnames({
            "text-left": true,
            "selected": tag === selected,
        });

        return (
            <Button outline size="sm" className={classes} key={index} onClick={() => confirm(tag)}>
                <Tag color={color}>
                    {tag}
                </Tag>
            </Button>
        );
    };

    return (
        <React.Fragment>
            <Input
                value={displayValue}
                onChange={(event) => setTyped(event.target.value)}
                onKeyPress={onKeyPress}
                onKeyDown={onKeyDown}
                innerRef={inputRef}
            />
            {tags.length > 0 && (
                <ButtonGroup id="tag_suggestions" vertical className="mt-3 d-flex">
                    {tags.map(renderTag)}
                </ButtonGroup>
            )}
        </React.Fragment>
    );
};

type AddTagProps = {
    path: string;
};

export const AddTag: React.FC<AddTagProps> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [addTag, { loading }] = useAddTagsMutation();
    const { data: tagGroupsQuery } = useTagGroupsQuery();
    const [tags, setTags] = useState<string[]>([]);
    const refetchFilesQuery = useRefetchFilesQuery();
    const refetchTagsQuery = useRefetchTagsQuery();
    
    const addSelectedTag = (tag: string) => {
        setTags(Array.from(new Set([...tags, tag])).sort());
    };

    const removeTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag));
    };

    const confirm = async() => {
        await addTag({
            variables: {
                path: props.path,
                tags,
            },
            refetchQueries: [refetchFilesQuery, refetchTagsQuery]
        });
        setIsOpen(false);
        setTags([]);
    };

    if (loading || !tagGroupsQuery) {
        return <Loading />;
    }

    return (
        <>
            <Badge className="add_tag" color="primary" onClick={() => setIsOpen(true)} >
                <Octicon icon={Plus} height={12} verticalAlign="middle" />
            </Badge>
            <Modal isOpen={isOpen} toggle={() => setIsOpen(false)}>
                <ModalHeader toggle={() => setIsOpen(false)}>
                    <Octicon icon={Plus} verticalAlign="middle" /> Add tag
                </ModalHeader>
                <ModalBody>
                    <p className="break">
                        {props.path}
                    </p>
                    <p>
                        {tags.map(tag => {
                            const color = getColorOfTag(tagGroupsQuery.tagGroups, tag);
                            return (
                                <>
                                    <Tag color={color}>
                                        {tag}
                                        <a className="remove_tag ml-2" href="#" onClick={() => removeTag(tag)}>
                                            <Octicon icon={Trashcan} size={12} verticalAlign="middle" />
                                        </a>
                                    </Tag>
                                    &nbsp;
                                </>
                            );
                        })}
                    </p>
                    <TagList confirm={addSelectedTag} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={confirm}>
                        OK
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};
