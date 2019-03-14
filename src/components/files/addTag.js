import React, { useState } from "react";
import { Button, Badge, Input, Modal, ModalHeader, ModalBody } from "reactstrap";
import Octicon, { Plus } from "@githubprimer/octicons-react";
import { Mutation } from "../util";
import queries from "../../queries";
import { connect } from "react-redux";
import { CONFIRM_KEYS } from "../../const";
import PropTypes from "prop-types";

const TagList = (props) => {
    return (
        null
    );
};

const AddTag = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tag, setTag] = useState("");

    const confirm = () => {
        setIsOpen(false);
        setTag("");
        props.confirm(tag);
    };

    const onKeyPress = (event) => {
        if (CONFIRM_KEYS.indexOf(event.which) !== -1) {
            confirm();
        }
    };

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
                        innerRef={(ref) => ref && ref.focus()}
                        value={tag}
                        onChange={(event) => setTag(event.target.value)}
                        onKeyPress={onKeyPress}
                    />
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
