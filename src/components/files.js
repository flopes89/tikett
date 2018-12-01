import React from "react";
import { Table } from "reactstrap";

export default (files_) => (
    <Table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Tags</th>
            </tr>
        </thead>
        <tbody>
            {files_.map((file_, index_) => (
                <tr key={index_}>
                    <td>{file_.name}</td>
                    <td>{file_.tags.map((tag_) => (
                        <span>{tag_.name}</span>
                    ))}</td>
                </tr>
            ))}
        </tbody>
    </Table>
);
