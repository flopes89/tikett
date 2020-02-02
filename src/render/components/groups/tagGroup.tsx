import React from "react";
import { Row, Col } from "reactstrap";
import Octicon, { Trashcan } from "@primer/octicons-react";
import { Tags } from "../tags";
import { Droppable, DroppableProps } from "react-beautiful-dnd";
import { ColorPicker } from "./colorPicker";
import classnames from "classnames";
import { useTagsState } from "../../state/tags";
import { useDragState } from "../../state/drag";
import { TagGroup as TagGroupModel } from "../../model";

type TagGroupProps = {
    group: TagGroupModel;
};

export const TagGroup: React.FC<TagGroupProps> = (props) => {
    const { removeGroup } = useTagsState();
    const { isDraggingTag } = useDragState();

    const renderTagGroup: DroppableProps["children"] = (provided, snapshot) => {
        const classes = classnames("tag_group", {
            "drop_ready": isDraggingTag,
            "drag_over": snapshot.isDraggingOver,
        });
    
        return (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={classes}
            >
                <Tags tags={props.group.tags} />
                {provided.placeholder}
            </div>
        );
    };
    
    return (
        <>
            <Row>
                <Col>
                    <strong>{props.group.name}</strong>
                    &nbsp;
                    <ColorPicker group={props.group} />
                    &nbsp;
                    <a href="#" onClick={() => removeGroup(props.group.name)}>
                        <Octicon icon={Trashcan} />
                    </a>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Droppable droppableId={"tagGroup|" + props.group.name}>
                        {(provided, snapshot) => renderTagGroup(provided, snapshot)}
                    </Droppable>
                </Col>
            </Row>
        </>
    );
};
