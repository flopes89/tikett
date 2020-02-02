import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Tag } from "../tags";
import { Row, Col } from "reactstrap";
import classnames from "classnames";
import Octicon, { Trashcan } from "@primer/octicons-react";
import { useFileBrowserState } from "../../state/fileBrowser";
import { useDragState } from "../../state/drag";
import { useTagsState } from "../../state/tags";
import { getColorOfTag } from "../../util";

export const Filter: React.FC = () => {
    const { filters, removeFilter } = useFileBrowserState();
    const { groups } = useTagsState();
    const { isDraggingTag } = useDragState();

    const renderTag = (tag: string) => {
        const color = getColorOfTag(groups, tag);

        return (
            <div key={tag} className="tag">
                <Tag color={color}>
                    {tag}
                    <a className="remove_tag ml-2" href="#" onClick={() => removeFilter(tag)}>
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
