import React from "react";
import { Row, Col, Button, Breadcrumb, BreadcrumbItem } from "reactstrap";
import Octicon, { X } from "@primer/octicons-react";
import {  useFileBrowserState } from "../../state/fileBrowser";
import { useHeightAdjust } from "../../util";

export const FilePreview = () => {
    const { selected, selectFile } = useFileBrowserState();

    useHeightAdjust("#file_preview iframe");

    if (!selected) {
        return null;
    }

    return (
        <Col id="file_preview" xs={5}>
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
