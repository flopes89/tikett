import React from "react";
import { Table } from "reactstrap";
import Tag from "./tag";

export default ({ files }) => (
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
                    name = "[" + name + "]";
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
);
