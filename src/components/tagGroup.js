import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import Octicon, { Trashcan } from "@githubprimer/octicons-react";
import Tag from "../layout/tag";
import { Mutation } from "react-apollo";
import { catchLoadingError } from "./util";
import queries from "../queries";

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

const TagGroupContainer = (props) => (
    <Mutation
        mutation={queries.REMOVE_TAG_GROUP}
        variables={{ group: props.name }}
        refetchQueries={[{
            query: queries.GET_TAG_GROUPS,
        }]}
    >
        {(remove, state) => catchLoadingError(state)(<TagGroup {...props} remove={remove} />)}
    </Mutation>
);

TagGroupContainer.propTypes = {
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape(Tag.propTypes)),
};

TagGroup.propTypes = {
    ...TagGroupContainer.propTypes,
    remove: PropTypes.func,
};

export default TagGroupContainer;
