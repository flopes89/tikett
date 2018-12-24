import React from "react";
import { Container, Row, Col, Navbar, NavbarBrand } from "reactstrap";
import Files from "./containers/files";
import ReloadButton from "./containers/reloadButton";
import TagGroups from "./containers/tagGroups";
import Breadcrumbs from "./containers/breadcrumbs";
import Octicon, { Tag } from "@githubprimer/octicons-react";
import SetRoot from "./containers/setRoot";

export default () => (
    <div>
        <header>
            <Navbar dark className="bg-dark mb-3">
                <Container>
                    <NavbarBrand tag="a" href="/">
                        <h1><Octicon icon={Tag} size="medium" /> tikett</h1>
                    </NavbarBrand>
                    <SetRoot />
                    <ReloadButton />
                </Container>
            </Navbar>
        </header>
        <main>
            <Container>
                <Row>
                    <Col xs={4}>
                        <TagGroups />
                    </Col>
                    <Col>
                        <Breadcrumbs />
                        <Files />
                    </Col>
                </Row>
            </Container>
        </main>
        <hr />
        <footer className="text-center mb-3">
            <Container>
                <a href="https://github.com/flopes89/tikett">tikett</a> &copy; Florian Peschka
            </Container>
        </footer>
    </div>
);
