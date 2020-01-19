import React, { useState } from "react";
import { Row, Col, ButtonGroup, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Octicon, { Inbox } from "@primer/octicons-react";
import { useDb } from "../../db";

type FolderListProps = {
    current: string;
    onSelect: (folder: string) => void;
};

const FolderList: React.FC<FolderListProps> = (props) => (
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

type ConfirmButtonProps = {
    current: string;
    close: () => void;
};

const ConfirmButton: React.FC<ConfirmButtonProps> = (props) => (
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

type FolderSelectionProps = {
    initialFolder?: string;
    close: () => void;
};

const FolderSelection: React.FC<FolderSelectionProps> = (props) => {
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

type SetRootProps = {
    forceOpen: boolean;
};

export const SetRoot: React.FC<SetRootProps> = (props) => {
    const [isOpen, setIsOpen] = useState(props.forceOpen);
    const config = useDb();

    if (!config) {
        return null;
    }

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
                    <FolderSelection initialFolder={config.root} close={() => setIsOpen(false)} />
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};
