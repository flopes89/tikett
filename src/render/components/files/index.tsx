import React from "react";
import { Table, Alert } from "reactstrap";
import { Row, Col, Label, Input, } from "reactstrap";
import { File } from "./file";
import { useGetFiles } from "../../files";
import { useFileBrowserState } from "../../state/fileBrowser";
import { useDb } from "../../state/db";

export const Files: React.FC = () => {
    const { root } = useDb();
    const { currentFolder, showDescendants, filters, toggleDescendants } = useFileBrowserState();
    const { err, pending, result } = useGetFiles({
        root,
        current: currentFolder,
        showDescendants,
        filters,
    });

    if (pending) {
        return <Alert color="info">"Loading..."</Alert>;
    }

    if (!result) {
        return <Alert color="danger">No data received!</Alert>;
    }

    if (err) {
        return <Alert color="danger">{err}</Alert>;
    }

    return (
        <div id="files_component">
            <Row>
                <Col>
                    {/*<Filter />*/}
                </Col>
                <Col xs={4} className="text-right">
                    <Label check className="pl-2">
                        <Input
                            type="checkbox"
                            checked={showDescendants}
                            onChange={toggleDescendants}
                        />
                        Show descendants
                    </Label>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <Table>
                        <colgroup>
                            <col width="40%" />
                        </colgroup>
                        <tbody>
                            {result.map((file, index) => (
                                <File
                                    key={index}
                                    name={file.name}
                                    isFile={file.isFile}
                                    path={file.path}
                                    tags={file.tags}
                                />
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div >
    );
};
