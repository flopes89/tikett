import React from "react";
import { Table } from "reactstrap";
import Tag from "./tag";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Breadcrumb,
    BreadcrumbItem,
} from "reactstrap";

export default ({
    files,
    showAllChildren,
    toggleShowAllChildren,
    breadcrumbs,
    openFolder
}) => (
        <div id="files_component">
            <Form>
                <FormGroup check>
                    <Label check>
                        <Input
                            type="checkbox"
                            checked={showAllChildren}
                            onChange={toggleShowAllChildren}
                        />
                        Show all children
                </Label>
                </FormGroup>
            </Form>
            <Breadcrumb>
                <BreadcrumbItem>Home</BreadcrumbItem>
                {breadcrumbs.map((breadcrumb_, index_) => (
                    <BreadcrumbItem key={index_}>{breadcrumb_}</BreadcrumbItem>
                ))}
            </Breadcrumb>
            <Table hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file_, index_) => {
                        let name = file_.name;
                        let className = "";
                        let onClick = null;

                        if (!file_.isFile) {
                            name = "[" + name + "]";
                            className = "folder";
                            onClick = () => openFolder(file_.name);
                        }

                        return (
                            <tr key={index_} className={className} onClick={onClick}>
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
        </div>
    );
