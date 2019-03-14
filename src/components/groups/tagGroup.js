import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import Octicon, { Trashcan } from "@githubprimer/octicons-react";
import Tags from "../tags";
import { Mutation } from "../util";
import queries from "../../queries";
import { Droppable } from "react-beautiful-dnd";
import ColorPicker from "./colorPicker";

const TagGroup = (props) => (
    <Mutation
        mutation={queries.REMOVE_TAG_GROUP}
        variables={{ group: props.name }}
        refetchQueries={[
            { query: queries.GET_TAG_GROUPS },
        ]}
    >
        {(mutate) => (
            <React.Fragment>
                <Row>
                    <Col>
                        <strong>{props.name}</strong>
                        <ColorPicker group={props.name} color={props.color} />
                    </Col>
                    {props.name !== "Ungrouped" && (
                        <Col>
                            <a href="#" onClick={mutate}>
                                <Octicon icon={Trashcan} />
                            </a>
                        </Col>
                    )}
                </Row>
                <Row>
                    <Col>
                        <Droppable droppableId={"tagGroup|" + props.name}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="tag_group"
                                >
                                    <Tags tags={props.tags} color={props.color} />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </Col>
                </Row>
            </React.Fragment>
        )}
    </Mutation>
);

TagGroup.propTypes = {
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
};

export default TagGroup;
