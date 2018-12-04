import React from "react";
import { Row, Col } from "reactstrap";
import Tag from "./tag";
import CreateTagGroup from "../containers/createTagGroup";
import PropTypes from "prop-types";

const tagGroup = (group, index) => (
    <div className="tag_group" key={index}>
        <Row>
            <Col><strong>{group.name}</strong></Col>
        </Row>
        <Row>
            <Col>
                {group.tags.map((tag, index) => (
                    <Tag key={index} color={tag.color}>{tag.name}</Tag>
                ))}
            </Col>
        </Row>
    </div>
);

const TagGroups = ({ tagGroups }) => (
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

TagGroups.propTypes = {
    tagGroups: PropTypes.arrayOf(PropTypes.shape(Tag.propTypes)),
};

export default TagGroups;
