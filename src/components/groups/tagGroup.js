import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import Octicon, { Trashcan } from "@githubprimer/octicons-react";
import Tags from "../tags";
import { Mutation } from "../util";
import queries from "../../queries";
import { Droppable } from "react-beautiful-dnd";
import ColorPicker from "./colorPicker";
import classnames from "classnames";
import { connect } from "react-redux";

const renderTagGroup = (provided, snapshot, props) => {
    const classes = classnames("tag_group", {
        "drop_ready": props.isDragging,
        "drag_over": snapshot.isDraggingOver,
    });

    return (
        <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={classes}
        >
            <Tags tags={props.tags} color={props.color} />
            {provided.placeholder}
        </div>
    );
};

let TagGroup = (props) => (
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
                        &nbsp;
                        <ColorPicker group={props.name} color={props.color} />
                        &nbsp;
                        {props.name !== "Ungrouped" && (
                            <a href="#" onClick={mutate}>
                                <Octicon icon={Trashcan} />
                            </a>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Droppable droppableId={"tagGroup|" + props.name}>
                            {(provided, snapshot) => renderTagGroup(provided, snapshot, props)}
                        </Droppable>
                    </Col>
                </Row>
            </React.Fragment>
        )}
    </Mutation>
);

TagGroup = connect(
    (state) => ({
        isDragging: state.global.isDraggingTag,
    })
)(TagGroup);

TagGroup.propTypes = {
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
};

export default TagGroup;
