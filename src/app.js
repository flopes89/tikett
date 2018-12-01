import React from "react";
import { Container, Row, Col } from "reactstrap";
import Files from "./containers/files";
import ReloadButton from "./containers/reloadButton";

export default () => (
    <Container id="root">
        <Row>
            <Col>
                <h1>tagster</h1>
            </Col>
        </Row>
        <Row>
            <Col><ReloadButton /></Col>
        </Row>
        <Row>
            <Col xs={4}>
                <h2>Tag Groups</h2>
            </Col>
            <Col>
                <h2>Files</h2>
                <Files />
            </Col>
        </Row>
    </Container>
);
