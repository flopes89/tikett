import React from "react";
import { Table, Alert } from "reactstrap";
import { Row, Col, Label, Input, } from "reactstrap";
import { File } from "./file";
import { useFileBrowserState } from "../../state/fileBrowser";
import { Loading } from "../util";
import { Filter } from "./filter";
import { useFilesQuery, useConfigQuery } from "../../../generated/graphql";
import { useHeightAdjust } from "../../util";

const FileList: React.FC = () => {
    const { currentFolder, showDescendants, filters, toggleDescendants } = useFileBrowserState();
    const { data } = useFilesQuery({
        variables: {
            current: currentFolder,
            showDescendants,
            filters,
        }
    });
    
    useHeightAdjust("#files_table");

    if (!data) {
        return <Loading />;
    }

    return (
        <div id="files_component">
            <Row>
                <Col>
                    <Filter />
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
            <Row id="files_table" className="mt-5">
                <Col>
                    <Table responsive>
                        <colgroup>
                            <col width="16px" />
                            <col width="40%" />
                        </colgroup>
                        <tbody>
                            {data.files.map((file, index) => (
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
        </div>
    );
};

export const Files: React.FC = () => {
    const { data } = useConfigQuery();

    if (!data) {
        return <Loading />;
    }

    if (data.config.root) {
        return <FileList />;
    }

    return <Alert alert="info">You need to select a root folder first!</Alert>;
};
