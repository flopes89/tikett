import React from "react";
import { Row, Col } from "reactstrap";
import CreateTagGroup from "./createTagGroup";
import PropTypes from "prop-types";
import TagGroup from "./tagGroup";
import { Query } from "react-apollo";
import queries from "../queries";
import { catchLoadingError } from "./util";

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

const TagGroupsContainer = () => (
    <Query query={queries.GET_TAG_GROUPS}>
        {(state) => catchLoadingError(state)(<TagGroups tagGroups={state.data.tagGroups} />)}
    </Query>
);

export default TagGroupsContainer;
