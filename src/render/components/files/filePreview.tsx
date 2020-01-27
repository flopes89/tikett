import React from "react";
import { Row, Col, Button, Breadcrumb, BreadcrumbItem } from "reactstrap";
import Octicon, { X } from "@githubprimer/octicons-react";
import {  useFileBrowserState } from "../../state/fileBrowser";

const getHeight = () => window.innerHeight - 280;

const adjustHeight = () => {
    const ref: HTMLIFrameElement|null = document.querySelector("#file_preview iframe");

    if (!ref) {
        return;
    }

    ref.style.height = getHeight + "px";
};

window.onresize = adjustHeight;

export const FilePreview = () => {
    const { selected, selectFile } = useFileBrowserState();

    if (!selected) {
        return null;
    }

    const height = getHeight();

    return (
        <Col id="file_preview">
            <Row>
                <Col xs={11}>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            {selected}
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Col>
                <Col xs={1} className="px-0 pt-2">
                    <Button onClick={() => selectFile("")}>
                        <Octicon icon={X} />
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <webview src={selected} style={{ height }} />
                </Col>
            </Row>
        </Col>
    );
};
