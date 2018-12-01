import React from "react";
import { Table } from "reactstrap";

export default ({ data: { files } }) => (
    <Table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Tags</th>
            </tr>
        </thead>
        <tbody>
            {files.map((file_) => (
                <tr>
                    <td>{file_.name}</td>
                    <td>{file_.tags.map((tag_) => (
                        <span>{tag_.name}</span>
                    ))}</td>
                </tr>
            ))}
        </tbody>
    </Table>
);
