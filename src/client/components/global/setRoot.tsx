import React, { useState } from "react";
import { Row, Col, ButtonGroup, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Octicon, { Inbox } from "@primer/octicons-react";
import { Loading } from "../util";
import { useFoldersQuery, useChangeRootMutation, useConfigQuery, FilesDocument, TagGroupsDocument, ConfigDocument } from "../../../generated/graphql";
import { useFileBrowserState } from "../../state/fileBrowser";

type FolderListProps = {
    current: string;
    onSelect: (folder: string) => void;
};

const FolderList: React.FC<FolderListProps> = (props) => {
    const { data } = useFoldersQuery({
        variables: {
            current: props.current,
        }
    });

    if (!data) {
        return <Loading />;
    }

    return (
        <>
            <ButtonGroup vertical className="d-flex">
                {data.folders.map(folder => (
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
    const [setRoot, { loading }] = useChangeRootMutation();
    const { currentFolder, showDescendants, filters } = useFileBrowserState();

    const onClick = async() => {
        await setRoot({
            variables: {
                folder: props.current,
            },
            refetchQueries: [{
                query: FilesDocument,
                variables: {
                    current: currentFolder,
                    showDescendants,
                    filters,
                }
            }, {
                query: TagGroupsDocument,
            }, {
                query: ConfigDocument,
            }]
        });
        props.close();
    };

    if (loading) {
        return <Loading />;
    }

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

export const SetRoot: React.FC = () => {
    const { data } = useConfigQuery();
    const [isOpen, setIsOpen] = useState(Boolean(data?.config.root));

    if (!data) {
        return <Loading />;
    }

    const close = () => {
        if (data.config.root) {
            setIsOpen(false);
        }
    };

    if (data.config.root) {
        return null;
    }

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
                    <FolderSelection initialFolder={data?.config.root} close={() => setIsOpen(false)} />
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};
