import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import Octicon, { Trashcan, Paintcan } from "@githubprimer/octicons-react";
import Tags from "./tags";
import { Mutation } from "react-apollo";
import { catchLoadingError } from "./util";
import queries from "../queries";
import { Droppable } from "react-beautiful-dnd";
import ColorPicker from "./colorPicker";
import { connect } from "react-redux";
import { changeColor, toggleColor, getColorOpenPropName, getColorPropName } from "../state/tagGroups";

const TagGroup = (props) => (
    <Droppable droppableId={"tagGroup|" + props.name}>
        {(provided) => (
            <div
                className="tag_group"
                ref={provided.innerRef}
                {...provided.droppableProps}
            >
                <Row>
                    <Col>
                        <strong>{props.name}</strong>
                        <a href="#" onClick={props.toggleColor}><Octicon icon={Paintcan} /></a>
                        {props.colorOpen && (<ColorPicker onChange={props.changeColor} color={props.color} />)}
                    </Col>
                    {props.name !== "Ungrouped" && (
                        <Col>
                            <a href="#" onClick={props.remove}><Octicon icon={Trashcan} /></a>
                        </Col>
                    )}
                </Row>
                <Row>
                    <Col>
                        <Tags tags={props.tags} color={props.color} />
                        {provided.placeholder}
                    </Col>
                </Row>
            </div>
        )}
    </Droppable>
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
    colorOpen: PropTypes.bool,
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    toggleColor: PropTypes.func,
    changeColor: PropTypes.func,
};

TagGroup.propTypes = {
    ...TagGroupContainer.propTypes,
    remove: PropTypes.func,
};

export default connect(
    (state, props) => ({
        colorOpen: state.tagGroups[getColorOpenPropName(props.name)] || false,
        color: state.tagGroups[getColorPropName(props.name)] || props.color || "",
    }),
    (dispatch, props) => ({
        toggleColor: () => dispatch(toggleColor(props.name)),
        changeColor: (color) => dispatch(changeColor(props.name, color)),
    }),
)(TagGroupContainer);
