import React from "react";
import { Row, Col } from "reactstrap";
import CreateTagGroup from "./createTagGroup";
import TagGroup from "./tagGroup";
import { Query } from "../util";
import queries from "../../queries";

export default () => (
    <Query query={queries.GET_TAG_GROUPS}>
        {(data) => (
            <div id="tag_groups">
                {data.tagGroups.map((group, index) => (
                    <TagGroup key={index} {...group} />
                ))}
                <hr />
                <Row>
                    <Col>
                        <CreateTagGroup />
                    </Col>
                </Row>
            </div>
        )}
    </Query>
);
