import React, { useState } from "react";
import { Button, Badge, Input, Modal, ModalHeader, ModalBody, ButtonGroup } from "reactstrap";
import Octicon, { Plus } from "@githubprimer/octicons-react";
import { Mutation, Query } from "../util";
import queries from "../../queries";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Tag } from "../tags";

const TagList = (props) => {
    if (props.current.length < 3) {
        return null;
    }

    const renderTag = (tag, index) => {
        const split = tag.split("#");
        const name = split[0];
        const color = split[1];

        if (name.indexOf(props.current) === -1) {
            return null;
        }

        return (
            <Button outline size="sm" className="text-left" key={index} onClick={() => props.onSelect(name)}>
                <Tag color={color}>
                    {name}
                </Tag>
            </Button>
        );
    };

    return (
        <Query query={queries.GET_TAGS}>
            {(data) => (
                <ButtonGroup vertical className="mt-3 d-flex">
                    {data.tags.map(renderTag)}
                </ButtonGroup>
            )}
        </Query>
    );
};

const AddTag = (props) => {
    let inputRef = null;
    const [isOpen, setIsOpen] = useState(false);
    const [tag, setTag] = useState("");

    const confirm = () => {
        setIsOpen(false);
        setTag("");
        props.confirm(tag);
    };

    const onKeyPress = (event) => {
        if (event.which === 13) {
            confirm();
        }
    };

    const setRef = (ref) => {
        inputRef = ref;
    }

    if (isOpen && inputRef) {
        inputRef.focus();
    }

    return (
        <React.Fragment>
            <Badge className="add_tag" color="primary" onClick={() => setIsOpen(true)}>
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
                    <Input
                        innerRef={setRef}
                        value={tag}
                        onChange={(event) => setTag(event.target.value)}
                        onKeyPress={onKeyPress}
                    />
                    <TagList current={tag} onSelect={setTag} />
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
