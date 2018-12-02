import React from "react";
import { Table } from "reactstrap";
import Tag from "./tag";
import {
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Breadcrumb,
    BreadcrumbItem,
} from "reactstrap";
import Octicon, { FileDirectory, File } from "@githubprimer/octicons-react";

export default ({
    files,
    showDescendants,
    toggleShowDescendants,
    breadcrumbs,
    openFolder
}) => (
        <div id="files_component">
            <Row>
                <Col>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <a href="#" onClick={() => openFolder("/")}>
                                Home
                            </a>
                        </BreadcrumbItem>
                        {breadcrumbs.map((breadcrumb_, index_) => {
                            let inner = breadcrumb_.name;

                            if (index_ < (breadcrumbs.length - 1)) {
                                inner = (
                                    <a href="#" onClick={() => openFolder(breadcrumb_.path)}>
                                        {inner}
                                    </a>
                                );
                            }

                            return (
                                <BreadcrumbItem key={index_}>
                                    {inner}
                                </BreadcrumbItem>
                            );
                        })}
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <FormGroup check>
                            <Label check className="pl-2">
                                <Input
                                    type="checkbox"
                                    checked={showDescendants}
                                    onChange={toggleShowDescendants}
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
                            {files.map((file_, index_) => {
                                let name = file_.name;
                                let icon = (<Octicon icon={File} />);
                                let className = "file";
                                let onClick = null;

                                if (!file_.isFile) {
                                    name = "[" + name + "]";
                                    icon = (<Octicon icon={FileDirectory} />);
                                    className = "folder";
                                    onClick = () => openFolder(file_.name);
                                }

                                return (
                                    <tr key={index_} className={className} onClick={onClick}>
                                        <td>
                                            {icon}
                                        </td>
                                        <td>
                                            {name}
                                        </td>
                                        <td>
                                            {file_.isFile && file_.tags.map((tag_, index_) => (
                                                <Tag key={index_} color={tag_.color}>{tag_.name}</Tag>
                                            ))}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div >
    );
