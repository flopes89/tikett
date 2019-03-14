import React, { useState } from "react";
import { Row, Col, ButtonGroup, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Octicon, { Inbox } from "@githubprimer/octicons-react";
import queries from "../../queries";
import { Query, Mutation } from "../util";

const FolderList = (props) => (
    <Query
        query={queries.GET_FOLDERS}
        variables={{ current: props.current }}
    >
        {(data) => (
            <ButtonGroup vertical className="d-flex">
                {data.folders.map((folder) => (
                    <Button
                        outline
                        size="sm"
                        className="text-left"
                        key={folder.path}
                        onClick={() => props.onSelect(folder.path)}
                    >
                        {folder.name}
                    </Button>
                ))}
            </ButtonGroup>
        )}
    </Query>
);

const ConfirmButton = (props) => (
    <Mutation
        mutation={queries.CHANGE_ROOT}
        update={props.close}
        variables={{ folder: props.current }}
        refetchQueries={[
            { query: queries.GET_FILES },
            { query: queries.GET_TAG_GROUPS },
            { query: queries.GET_CONFIG }
        ]}
    >
        {(mutate) => (<Button block color="primary" onClick={mutate}>Confirm</Button>)}
    </Mutation>
);

const FolderSelection = (props) => {
    const [current, setCurrent] = useState(props.initialFolder || "/");

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <p>{current}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FolderList current={current} onSelect={setCurrent} />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <ConfirmButton current={current} close={props.close} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

let SetRoot = (props) => {
    const [isOpen, setIsOpen] = useState(props.forceOpen);

    const close = () => {
        if (!props.forceOpen) {
            setIsOpen(false);
        }
    };

    return (
        <React.Fragment>
            <Button onClick={() => setIsOpen(true)}>
                <Octicon icon={Inbox} /> Change root
            </Button>
            <Modal isOpen={isOpen} toggle={close}>
                <ModalHeader toggle={close}>
                    <Octicon icon={Inbox} verticalAlign="middle" /> Select root folder
                </ModalHeader>
                <ModalBody>
                    <FolderSelection initialFolder={props.initialFolder} close={() => setIsOpen(false)} />
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};

SetRoot = () => (
    <Query query={queries.GET_CONFIG}>
        {(data) => (<SetRoot initialFolder={data.config.root} />)}
    </Query>
);

export default SetRoot;
