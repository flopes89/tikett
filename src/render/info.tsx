import React, { useState } from "react";
import Octicon, { Question } from "@primer/octicons-react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { remote } from "electron";

export const Info: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const close = () => setIsOpen(false);

    const rows = new Map<string, string>();
    rows.set("Build", process.env.BUILD_INFO || "dev");
    rows.set("Persist path", remote.app.getPath("userData"));

    const elements: React.ReactNodeArray = [];
    for (const [key, val] of rows) {
        elements.push(
            <React.Fragment key={key}>
                <dt className="col-sm-3">
                    {key}
                </dt>
                <dd className="col-sm-9">
                    {val}
                </dd>
            </React.Fragment>
        );
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                <Octicon icon={Question} />
            </Button>
            <Modal isOpen={isOpen} toggle={close}>
                <ModalHeader toggle={close}>
                    <Octicon icon={Question} verticalAlign="middle" /> Info
                </ModalHeader>
                <ModalBody>
                    <dl className="row">
                        {elements}
                    </dl>
                </ModalBody>
            </Modal>
        </>
    );
};
