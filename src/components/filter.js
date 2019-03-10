import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import Tag from "../layout/tag";
import { Row, Col } from "reactstrap";
import classnames from "classnames";
import Octicon, { Trashcan } from "@githubprimer/octicons-react";
import { removeFilter } from "../state/fileBrowser";

const renderFilter = (provided, snapshot, props) => {
    const classes = classnames({
        "drop_ready": props.isDragging,
        "drag_over": snapshot.isDraggingOver,
    });

    const renderTag = (tag, index) => {
        const parts = tag.split("#");
        const name = parts[0];
        const color = parts[1];

        return (
            <div key={name} className="tag">
                <Tag color={color}>
                    {name}
                    <a className="remove_tag ml-2" href="#" onClick={() => props.removeFilter(index)}>
                        <Octicon icon={Trashcan} size={12} verticalAlign="middle" />
                    </a>
                </Tag>
            </div>
        );
    };

    return (
        <div
            id="filter"
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={classes}
        >
            {props.filters.map(renderTag)}
            {provided.placeholder}
        </div>
    );
};

const Filter = (props) => (
    <Row>
        <Col xs={1}>
            <strong>Filters</strong>
        </Col>
        <Col>
            <Droppable droppableId="filter">
                {(provided, snapshot) => renderFilter(provided, snapshot, props)}
            </Droppable>
        </Col>
    </Row>
);

export default connect(
    (state) => ({
        isDragging: state.global.isDraggingTag,
        filters: state.fileBrowser.filters,
    }),
    (dispatch) => ({
        removeFilter: (index) => dispatch(removeFilter(index)),
    })
)(Filter);
