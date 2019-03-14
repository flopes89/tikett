import React from "react";
import { Table } from "reactstrap";
import { Row, Col, Label, Input, } from "reactstrap";
import File from "./file";
import { Query } from "../util";
import { connect } from "react-redux";
import queries from "../../queries";
import { toggleShowDescendants } from "../../state/fileBrowser";
import Filter from "./filter";

const Files = (props) => (
    <div id="files_component">
        <Row>
            <Col>
                <Filter />
            </Col>
            <Col xs={2}>
                <Label check className="pl-2">
                    <Input
                        type="checkbox"
                        checked={props.showDescendants}
                        onChange={props.toggleShowDescendants}
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
                        {props.files.map((file, index) => (
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

let FilesContainer = (props) => (
    <Query
        query={queries.GET_FILES}
        variables={{
            current: props.current,
            showDescendants: props.showDescendants,
            filters: props.filters,
        }}
    >
        {(data) => (
            <Files
                showDescendants={props.showDescendants}
                toggleShowDescendants={props.toggleShowDescendants}
                files={data.files}
            />
        )}
    </Query>
);

FilesContainer = connect(
    (state) => ({
        showDescendants: state.fileBrowser.showDescendants || false,
        current: state.fileBrowser.currentFolder || "/",
        filters: state.fileBrowser.filters || [],
    }),
    (dispatch) => ({
        toggleShowDescendants: () => dispatch(toggleShowDescendants()),
    }),
)(FilesContainer);

export default FilesContainer;
