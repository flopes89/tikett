import React from "react";
import { Row, Col } from "reactstrap";
import { CreateTagGroup } from "./createTagGroup";
import { TagGroup } from "./tagGroup";
import { useTagsState } from "../../state/tags";

export const TagGroups: React.FC = () => {
    const { groups } = useTagsState();

    return (
        <div id="tag_groups">
            {groups.map((group, index) => (
                <TagGroup
                    key={index}
                    name={group.name}
                    tags={group.tags}
                    color={group.color}
                />
            ))}
            <hr />
            <Row>
                <Col>
                    <CreateTagGroup />
                </Col>
            </Row>
        </div>
    );
};
