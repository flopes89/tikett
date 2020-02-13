import React, { useRef, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { CreateTagGroup } from "./createTagGroup";
import { TagGroup } from "./tagGroup";
import { useTagGroupsQuery } from "../../../generated/graphql";
import { Loading } from "../util";
import { useHeightAdjust } from "../../util";

export const TagGroups: React.FC = () => {
    const { data } = useTagGroupsQuery();
    useHeightAdjust("#tag_groups");

    if (!data) {
        return <Loading />;
    }

    return (
        <div id="tag_groups" className="pr-3">
            {data?.tagGroups.map((group, index) => <TagGroup key={index} group={group} />)}
            <hr />
            <Row>
                <Col>
                    <CreateTagGroup />
                </Col>
            </Row>
        </div>
    );
};
