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
                    <Button key={path} onClick={() => onSelect(path)}>
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
        {(setRoot) => (<Button onClick={setRoot}>Confirm</Button>)}
    </Mutation>
);

const FolderSelection = ({ close }) => {
    const [current, setCurrent] = useState("/");

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <p><strong>Current selection</strong>: {current}</p>
                </Col>
                <Col>
                    <ConfirmButton current={current} close={close} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <FolderList current={current} onSelect={setCurrent} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

const SetRoot = ({ forceOpen }) => {
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
                    <FolderSelection close={close} />
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};

const SetRootContainer = () => (
    <Query query={queries.GET_CONFIG}>
        {({ data }) => (<SetRoot forceOpen={!data.config.root} />)}
    </Query>
);

export default SetRootContainer;
