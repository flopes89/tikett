import React from "react";
import { Table } from "reactstrap";
import { Row, Col, Form, FormGroup, Label, Input, } from "reactstrap";
import PropTypes from "prop-types";
import File from "./file";

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

export default Files;
