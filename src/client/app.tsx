import * as React from "react";
import { Container, Navbar, NavbarBrand, Row, Col } from "reactstrap";
import Octicon, { Tag } from "@primer/octicons-react";
import { SetRoot } from "./components/global/setRoot";
import { TagGroups } from "./components/groups";
import { Breadcrumbs } from "./components/files/breadcrumbs";
import { Files } from "./components/files";
import { FilePreview } from "./components/files/filePreview";
import { Info } from "./info";
import { files } from "../server/resolver/files";

export default () => (
    <React.Fragment>
        <header>
            <Navbar dark className="bg-dark mb-3">
                <Row style={{ flexGrow: 1 }} className="align-items-center no-gutters">
                    <Col>
                        <NavbarBrand tag="a" href="/">
                            <h1><Octicon icon={Tag} size="medium" /> tikett</h1>
                        </NavbarBrand>
                    </Col>
                    <Col className="text-right">
                        <SetRoot />
                        &nbsp;
                        <Info />
                    </Col>
                </Row>
            </Navbar>
        </header>
        <main>
            <Container fluid>
                <Row>
                    <Col xs={2}>
                        <TagGroups />
                    </Col>
                    <Col>
                        <div id="files">
                            <Breadcrumbs />
                            <Files />
                        </div>
                    </Col>
                    <FilePreview />
                </Row>
            </Container>
        </main>
        <footer className="text-center mb-3">
            <hr />
            <Container fluid>
                <Row>
                    <Col>
                        <a href="https://github.com/flopes89/tikett">tikett</a> &copy; Florian Peschka
                    </Col>
                </Row>
            </Container>
        </footer>
    </React.Fragment>
);
