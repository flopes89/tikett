import React from "react";
import { Row, Col } from "reactstrap";
import Tag from "./tag";
import CreateTagGroup from "../containers/addTagGroup";

const tagGroup = (group_, index_) => (
    <div className="tag_group" key={index_}>
        <Row>
            <Col><strong>{group_.name}</strong></Col>
        </Row>
        <Row>
            <Col>
                {group_.tags.map((tag_, index_) => (
                    <Tag key={index_} color={tag_.color}>{tag_.name}</Tag>
                ))}
            </Col>
        </Row>
    </div>
);

export default ({ tagGroups }) => (
    <div id="tag_groups">
        {tagGroups.map(tagGroup)}
        <hr />
        <Row>
            <Col>
                <CreateTagGroup />
            </Col>
        </Row>
    </div>
);
