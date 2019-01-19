import React from "react";
import { Table } from "reactstrap";
import { Row, Col, Form, FormGroup, Label, Input, } from "reactstrap";
import PropTypes from "prop-types";
import File from "./file";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import Files from "./files";
import queries from "../queries";
import { catchLoadingError } from "./util";
import * as actions from "../reducer";

const Files = (props) => (
    <div id="files_component">
        <Row>
            <Col>
                <Form>
                    <FormGroup check>
                        <Label check className="pl-2">
                            <Input
                                type="checkbox"
                                checked={props.showDescendants}
                                onChange={props.toggleShowDescendants}
                            />
                            Show descendants
                            </Label>
                    </FormGroup>
                </Form>
            </Col>
        </Row>
        <Row>
            <Col>
                <Table hover>
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
        }}
    >
        {(state) => catchLoadingError(state)(<Files {...props} files={state.data.files} />)}
    </Query>
);

export default connect(
    (state) => ({
        showDescendants: state.files.showDescendants,
        current: state.files.current,
    }),
    (dispatch) => ({
        toggleShowDescendants: () => dispatch({
            type: actions.FILES_TOGGLE_SHOWDESCENDANTS,
        }),
        openFolder: (folder) => dispatch({
            type: actions.FILES_OPENFOLDER,
            folder,
        }),
    }),
)(FilesContainer);
