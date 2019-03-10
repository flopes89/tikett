import React from "react";
import { Table } from "reactstrap";
import { Row, Col, Form, FormGroup, Label, Input, } from "reactstrap";
import PropTypes from "prop-types";
import File from "./file";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import queries from "../queries";
import { catchLoadingError } from "./util";
import { toggleShowDescendants, openFolder } from "../state/fileBrowser";
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
                                tags={file.tags}
                                openFolder={props.openFolder}
                                path={file.path}
                            />
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    </div >
);

Files.propTypes = {
    files: PropTypes.arrayOf(PropTypes.shape(File.propTypes)),
    showDescendants: PropTypes.bool,
    toggleShowDescendants: PropTypes.func,
    openFolder: PropTypes.func,
};

const FilesContainer = (props) => (
    <Query
        query={queries.GET_FILES}
        variables={{
            current: props.current,
            showDescendants: props.showDescendants,
            filters: props.filters,
        }}
    >
        {(state) => catchLoadingError(state)(<Files {...props} files={state.data.files} />)}
    </Query>
);

export default connect(
    (state) => ({
        showDescendants: state.fileBrowser.showDescendants || false,
        current: state.fileBrowser.currentFolder || "/",
        filters: state.fileBrowser.filters || [],
    }),
    (dispatch) => ({
        toggleShowDescendants: () => dispatch(toggleShowDescendants()),
        openFolder: (folder) => dispatch(openFolder(folder)),
    }),
)(FilesContainer);
