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

export default ({ files, showAllChildren, toggleShowAllChildren, breadcrumbs, openFolder }) => (
    <div>
        <Form>
            <FormGroup check>
                <Label check>
                    <Input
                        type="checkbox"
                        name="showAllChildren"
                        checked={showAllChildren}
                        onChange={toggleShowAllChildren}
                    />
                    Show all children
                </Label>
            </FormGroup>
        </Form>
        <Breadcrumb>
            {breadcrumbs.map((breadcrumb_, index_) => (
                <BreadcrumbItem key={index_}>{breadcrumb_}</BreadcrumbItem>
            ))}
        </Breadcrumb>
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Tags</th>
                </tr>
            </thead>
            <tbody>
                {files.map((file_, index_) => {
                    let name = file_.name;

                    if (!file_.isFile) {
                        name = (
                            <a onClick={() => openFolder(file_.name)}>
                                [{name}]
                            </a>
                        );
                    }

                    return (
                        <tr key={index_}>
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
