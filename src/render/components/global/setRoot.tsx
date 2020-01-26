import React, { useState } from "react";
import { Row, Col, ButtonGroup, Button, Modal, ModalBody, ModalHeader, Alert } from "reactstrap";
import Octicon, { Inbox } from "@primer/octicons-react";
import { useDb } from "../../state/db";
import { useGetFolders } from "../../files";

type FolderListProps = {
    current: string;
    onSelect: (folder: string) => void;
};

const FolderList: React.FC<FolderListProps> = (props) => {
    const { err, result } = useGetFolders(props.current);
    const folders = result || [];

    return (
        <>
            {err && (<Alert color="danger">{err}</Alert>)}
            <ButtonGroup vertical className="d-flex">
                {folders.map(folder => (
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
        </>
    );
};

type ConfirmButtonProps = {
    current: string;
    close: () => void;
};

const ConfirmButton: React.FC<ConfirmButtonProps> = (props) => {
    const db = useDb();

    const onClick = () => {
        db.setRoot(props.current);
        props.close();
    };

    return (
        <Button block color="primary" onClick={onClick}>Confirm</Button>
    );
};

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
    forceOpen?: boolean;
};

export const SetRoot: React.FC<SetRootProps> = (props) => {
    const [isOpen, setIsOpen] = useState(props.forceOpen);
    const db = useDb();

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
                    <FolderSelection initialFolder={db.root} close={() => setIsOpen(false)} />
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};
