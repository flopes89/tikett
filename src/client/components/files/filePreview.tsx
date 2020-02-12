import React, { useEffect } from "react";
import { Row, Col, Button, Breadcrumb, BreadcrumbItem } from "reactstrap";
import Octicon, { X } from "@primer/octicons-react";
import {  useFileBrowserState } from "../../state/fileBrowser";

const getHeight = () => {
    const tagGroups = document.querySelector("#tag_groups")?.clientHeight;
    const files = document.querySelector("#files")?.clientHeight;
    return Math.max(tagGroups || 0, files || 0, 300) - 50;
}

const adjustHeight = () => {
    const ref: HTMLIFrameElement|null = document.querySelector("#file_preview iframe");

    if (!ref) {
        return;
    }

    ref.style.height = getHeight() + "px";
};

window.onresize = adjustHeight;

export const FilePreview = () => {
    const { selected, selectFile } = useFileBrowserState();

    useEffect(adjustHeight);

    if (!selected) {
        return null;
    }

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
                    <iframe src={`/api/file?path=${selected}`} />
                </Col>
            </Row>
        </Col>
    );
};
