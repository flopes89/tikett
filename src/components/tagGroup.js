import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import Octicon, { Trashcan } from "@githubprimer/octicons-react";
import Tag from "./tag";

const TagGroup = (props) => (
    <div className="tag_group">
        <Row>
            <Col>
                <strong>{props.name}</strong>
            </Col>
            {props.name !== "Ungrouped" && (
                <Col>
                    <a href="#" onClick={props.remove}><Octicon icon={Trashcan} /></a>
                </Col>
            )}
        </Row>
        <Row>
            <Col>
                {props.tags.map((tag, index) => (
                    <Tag key={index} color={tag.color}>{tag.name}</Tag>
                ))}
            </Col>
        </Row>
    </div>
);

TagGroup.propTypes = {
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape(Tag.propTypes)),
    remove: PropTypes.func,
};

export default TagGroup;
