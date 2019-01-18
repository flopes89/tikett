import React from "react";
import { Row, Col } from "reactstrap";
import CreateTagGroup from "../containers/createTagGroup";
import PropTypes from "prop-types";
import TagGroup from "../containers/tagGroup";

const TagGroups = ({ tagGroups }) => (
    <div id="tag_groups">
        {tagGroups.map((group, index) => (
            <TagGroup key={index} name={group.name} tags={group.tags} />
        ))}
        <hr />
        <Row>
            <Col>
                <CreateTagGroup />
            </Col>
        </Row>
    </div>
);

TagGroups.propTypes = {
    tagGroups: PropTypes.arrayOf(PropTypes.shape(TagGroup.propTypes)),
};

export default TagGroups;
