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
                if (!file_.isFile) return null;

                return (
                    <tr key={index_}>
                        <td>{file_.name}</td>
                        <td>{file_.tags.map((tag_, index_) => (
                            <Tag key={index_} color={tag_.color}>{tag_.name}</Tag>
                        ))}</td>
                    </tr>
                );
            })}
        </tbody>
    </Table>
);
