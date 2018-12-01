import React from "react";
import { Table } from "reactstrap";

export default ({ files }) => (
    <Table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Tags</th>
            </tr>
        </thead>
        <tbody>
            {files.map((file_, index_) => (
                <tr key={index_}>
                    <td>{file_.name}</td>
                    <td>{file_.tags.map((tag_, index_) => (
                        <span key={index_}>{tag_.name}</span>
                    ))}</td>
                </tr>
            ))}
        </tbody>
    </Table>
);
