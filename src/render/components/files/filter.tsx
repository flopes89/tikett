import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Tag } from "../tags";
import { Row, Col } from "reactstrap";
import classnames from "classnames";
import Octicon, { Trashcan } from "@primer/octicons-react";
import { useFileBrowserState } from "../../state/fileBrowser";
import { useDragState } from "../../state/drag";

export const Filter: React.FC = (props) => {
    const { filters, removeFilter } = useFileBrowserState();
    const { isDraggingTag } = useDragState();

    const renderTag = (tag: string) => {
        const parts = tag.split("#");
        const name = parts[0];
        const color = parts[1];

        return (
            <div key={name} className="tag">
                <Tag color={color}>
                    {name}
                    <a className="remove_tag ml-2" href="#" onClick={() => removeFilter(name)}>
                        <Octicon icon={Trashcan} size={12} verticalAlign="middle" />
                    </a>
                </Tag>
            </div>
        );
    };

    return (
        <Row>
            <Col xs={3}>
                <strong>Filters</strong>
            </Col>
            <Col>
                <Droppable droppableId="filter">
                    {(provided, snapshot) => (
                        <div
                            id="filter"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={classnames({
                                "drop_ready": isDraggingTag,
                                "drag_over": snapshot.isDraggingOver,
                            })}
                        >
                            {filters.map(renderTag)}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </Col>
        </Row>
    );
};
