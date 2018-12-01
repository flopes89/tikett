import React from "react";
import {
    Container,
    Row,
    Col,
} from "reactstrap";
import Files from "./container/files";

export default () => (
    <Container id="root">
        <Row>
            <Col>
                <h1>tagster</h1>
            </Col>
        </Row>
        <Row>
            <Col>Folders</Col>
            <Col>
                <Files />
            </Col>
        </Row>
    </Container>
);
