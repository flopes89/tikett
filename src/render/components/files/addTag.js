import React, { useState } from "react";
import { Button, Badge, Input, Modal, ModalHeader, ModalBody, ButtonGroup } from "reactstrap";
import Octicon, { Plus } from "@githubprimer/octicons-react";
import { Mutation, Query } from "../util";
import queries from "../../queries";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Tag } from "../tags";
import classnames from "classnames";

const TagList = (props) => {
    const [typed, setTyped] = useState("");
    const [selected, setSelected] = useState("");

    const displayValue = (selected || typed).split("#")[0];

    const tags = props.tags.filter((tag) => typed.length >= 3 && tag.indexOf(typed) !== -1);

    const confirm = () => {
        props.confirm(displayValue);
        setTyped("");
        setSelected("");
    }

    const onKeyPress = (event) => {
        if (event.which === 13) {
            confirm();
        }

        if (selected) {
            setTyped(selected);
            setSelected("");
        }
    };

    const onKeyDown = (event) => {
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

    const renderTag = (tag, index) => {
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

const TagListContainer = (props) => (
    <Query query={queries.GET_TAGS}>
        {(data) => (
            <TagList confirm={props.confirm} tags={data.tags} />
        )}
    </Query >
);

const AddTag = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const confirm = (tag) => {
        setIsOpen(false);
        props.confirm(tag);
    };

    const onKeyDown = (event) => {
        if (event.key === "Enter") {
            setIsOpen(true);
            event.stopPropagation();
            return false;
        }
    };

    return (
        <React.Fragment>
            <Badge className="add_tag" color="primary" onClick={() => setIsOpen(true)} tabIndex="0" onKeyDown={onKeyDown}>
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
                    <TagListContainer confirm={confirm} />
                    <Button className="mt-3" color="primary" block onClick={confirm}>
                        Add tag
                    </Button>
                </ModalBody>
            </Modal>
        </React.Fragment >
    );
};

let AddTagContainer = (props) => {
    const refetch = [
        {
            query: queries.GET_FILES,
            variables: {
                current: props.current,
                showDescendants: props.showDescendants,
            }
        },
        { query: queries.GET_TAG_GROUPS },
        { query: queries.GET_TAGS }
    ];

    const renderAddTag = (mutate) => {
        const addTag = (tag) => mutate({
            variables: {
                path: props.path,
                name: tag,
            }
        });

        return (<AddTag path={props.path} confirm={addTag} />);
    }

    return (
        <Mutation mutation={queries.ADD_TAG} refetchQueries={refetch}>
            {renderAddTag}
        </Mutation>
    );
};

AddTagContainer = connect(
    (state) => ({
        current: state.fileBrowser.currentFolder,
        showDescendants: state.fileBrowser.showDescendants,
    }),
)(AddTagContainer);

AddTagContainer.propTypes = {
    path: PropTypes.string.isRequired,
};

export default AddTagContainer;
