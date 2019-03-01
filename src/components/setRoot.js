import React, { useState } from "react";
import { Row, Col, ButtonGroup, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Icon, { Inbox } from "@githubprimer/octicons-react";
import queries from "../queries";
import { Query, Mutation } from "./util";

const FolderList = ({ current, onSelect }) => (
    <Query query={queries.GET_FOLDERS} variables={{ current }}>
        {({ data: { folders } }) => (
            <ButtonGroup vertical className="d-flex">
                {folders.map(({ name, path }) => (
                    <Button outline size="sm" className="text-left" key={path} onClick={() => onSelect(path)}>
                        {name}
                    </Button>
                ))}
            </ButtonGroup>
        )}
    </Query>
);

const ConfirmButton = ({ current, close }) => (
    <Mutation
        mutation={queries.CHANGE_ROOT}
        update={close}
        variables={{ folder: current }}
        refetchQueries={[
            { query: queries.GET_FILES },
            { query: queries.GET_TAG_GROUPS },
            { query: queries.GET_CONFIG }
        ]}
    >
        {(setRoot) => (<Button block color="primary" onClick={setRoot}>Confirm</Button>)}
    </Mutation>
);

const FolderSelection = ({ initialFolder, close }) => {
    const [current, setCurrent] = useState(initialFolder || "/");

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
                    <ConfirmButton current={current} close={close} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

const SetRoot = ({ initialFolder, forceOpen }) => {
    const [isOpen, setIsOpen] = useState(forceOpen);

    const close = () => {
        if (!forceOpen) {
            setIsOpen(false);
        }
    };

    return (
        <React.Fragment>
            <Button onClick={() => setIsOpen(true)}>
                <Icon icon={Inbox} /> Change root
            </Button>
            <Modal isOpen={isOpen} toggle={close}>
                <ModalHeader toggle={close}>
                    <Icon icon={Inbox} /> Select root folder
                </ModalHeader>
                <ModalBody>
                    <FolderSelection initialFolder={initialFolder} close={() => setIsOpen(false)} />
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};

const SetRootContainer = () => (
    <Query query={queries.GET_CONFIG}>
        {({ data }) => (<SetRoot initialFolder={data.config.root} forceOpen={!data.config.root} />)}
    </Query>
);

export default SetRootContainer;
