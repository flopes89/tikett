import React, { useState, KeyboardEvent } from "react";
import { Button, Badge, Input, Modal, ModalHeader, ModalBody, ButtonGroup } from "reactstrap";
import Octicon, { Plus } from "@primer/octicons-react";
import { Tag } from "../tags";
import classnames from "classnames";
import { useTagsState, useFlatTagList } from "../../state/tags";

type TagListProps = {
    confirm: (tag: string) => void;
};

const TagList: React.FC<TagListProps> = (props) => {
    const [typed, setTyped] = useState("");
    const [selected, setSelected] = useState("");
    
    const displayValue = (selected || typed).split("#")[0];
    
    let tags = useFlatTagList();
    tags = tags.filter(tag => typed.length >= 3 && tag.indexOf(typed) !== -1);

    const confirm = () => {
        props.confirm(displayValue);
        setTyped("");
        setSelected("");
    }

    const onKeyPress = (event: KeyboardEvent) => {
        if (event.which === 13) {
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

        if (event.which === 8 && selected) {
            setTyped(selected);
            setSelected("");
        }

        if (event.which === 38) {
            if (selected === "") {
                setSelected(tags[tags.length - 1]);
            } else {
                setSelected(tags[Math.max(tags.indexOf(selected) - 1, 0)]);
            }
        }

        if (event.which === 40) {
            if (selected === "") {
                setSelected(tags[0]);
            } else {
                setSelected(tags[Math.min(tags.indexOf(selected) + 1, tags.length - 1)]);
            }
        }
    };

    const renderTag = (tag: string, index: number) => {
        const split = tag.split("#");
        const name = split[0];
        const color = split[1];

        const classes = classnames({
            "text-left": true,
            "selected": tag === selected,
        });

        return (
            <Button outline size="sm" className={classes} key={index} onClick={confirm}>
                <Tag color={color}>
                    {name}
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
    const { addTag } = useTagsState();

    const confirm = (tag: string) => {
        setIsOpen(false);
        addTag(tag, props.path);
    };

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            setIsOpen(true);
            event.stopPropagation();
            return false;
        }
    };

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
