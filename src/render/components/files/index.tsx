import React from "react";
import { Table, Alert } from "reactstrap";
import { Row, Col, Label, Input, } from "reactstrap";
import { File } from "./file";
import { useGetFiles } from "../../files";
import { useFileBrowserState } from "../../state/fileBrowser";
import { Loading, Error } from "../util";

type FileListProps = {
    root: string;
};

const FileList: React.FC<FileListProps> = (props) => {
    const { currentFolder, showDescendants, filters, toggleDescendants } = useFileBrowserState();
    const { err, pending, result } = useGetFiles({
        root: props.root,
        current: currentFolder,
        showDescendants,
        filters,
    });

    if (pending) {
        return <Loading />;
    }

    if (!result) {
        return <Error err="No data received!" />;
    }

    if (err) {
        return <Error err={err} />;
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

export const Files: React.FC = () => {
    const { root } = useFileBrowserState();

    if (root) {
        return <FileList root={root} />;
    }

    return <Alert alert="info">You need to select a root folder first!</Alert>;
};