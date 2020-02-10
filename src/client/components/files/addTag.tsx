import React, { useState, KeyboardEvent } from "react";
import { Button, Badge, Input, Modal, ModalHeader, ModalBody, ButtonGroup } from "reactstrap";
import Octicon, { Plus } from "@primer/octicons-react";
import { Tag } from "../tags";
import classnames from "classnames";
import { getColorOfTag } from "../../util";
import { useTagGroupsQuery, useTagsQuery, useAddTagMutation } from "../../../generated/graphql";
import { Loading } from "../util";

type TagListProps = {
    confirm: (tag: string) => void;
};

const TagList: React.FC<TagListProps> = (props) => {
    const { data: tagGroupsQuery } = useTagGroupsQuery();
    const { data: tagsQuery } = useTagsQuery();
    const [typed, setTyped] = useState("");
    const [selected, setSelected] = useState("");
    
    const displayValue = (selected || typed).split("#")[0];
    
    if (!tagsQuery || !tagGroupsQuery) {
        return <Loading />;
    }

    let tags = tagsQuery.tags;
    tags = tags.filter(tag => typed.length >= 3 && tag.indexOf(typed) !== -1);

    const confirm = () => {
        props.confirm(displayValue);
        setTyped("");
        setSelected("");
    }

    const onKeyPress = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            confirm();
        }

        if (selected) {
            setTyped(selected);
            setSelected("");
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
            <Button outline size="sm" className={classes} key={index} onClick={confirm}>
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
    const [addTag, { loading }] = useAddTagMutation();
    
    const confirm = async(tag: string) => {
        await addTag({
            variables: {
                path: props.path,
                tag,
            }
        });
        setIsOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            setIsOpen(true);
            event.stopPropagation();
            return false;
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <React.Fragment>
            <Badge className="add_tag" color="primary" onClick={() => setIsOpen(true)} tabIndex={0} onKeyDown={onKeyDown}>
                <Octicon icon={Plus} height={12} verticalAlign="middle" />
            </Badge>
            <Modal isOpen={isOpen} toggle={() => setIsOpen(false)}>
                <ModalHeader toggle={() => setIsOpen(false)}>
                    <Octicon icon={Plus} verticalAlign="middle" /> Add tag
                </ModalHeader>
                <ModalBody>
                    <p>
                        {props.path}
                    </p>
                    <TagList confirm={confirm} />
                </ModalBody>
            </Modal>
        </React.Fragment >
    );
};