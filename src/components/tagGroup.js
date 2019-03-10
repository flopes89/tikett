import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import Octicon, { Trashcan } from "@githubprimer/octicons-react";
import Tags from "./tags";
import { Mutation } from "react-apollo";
import { catchLoadingError } from "./util";
import queries from "../queries";
import { Droppable } from "react-beautiful-dnd";
import ColorPicker from "./colorPicker";

const TagGroup = (props) => (
    <React.Fragment>
        <Row>
            <Col>
                <strong>{props.name}</strong>
                <ColorPicker group={props.name} />
            </Col>
            {props.name !== "Ungrouped" && (
                <Col>
                    <a href="#" onClick={props.remove}><Octicon icon={Trashcan} /></a>
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
    tags: PropTypes.arrayOf(PropTypes.string),
    toggleColor: PropTypes.func,
    changeColor: PropTypes.func,
};

TagGroup.propTypes = {
    ...TagGroupContainer.propTypes,
    remove: PropTypes.func,
};

export default TagGroupContainer;
