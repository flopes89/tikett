import React from "react";
import { Container, Navbar, NavbarBrand, Row, Col } from "reactstrap";
import ReloadButton from "./components/reloadButton";
import Octicon, { Tag } from "@githubprimer/octicons-react";
import Main from "./components/main";
import SetRoot from "./components/setRoot";

export default () => (
    <div>
        <header>
            <Navbar dark className="bg-dark mb-3">
                <Container fluid>
                    <NavbarBrand tag="a" href="/">
                        <h1><Octicon icon={Tag} size="medium" /> tikett</h1>
                    </NavbarBrand>
                    <Row>
                        <Col>
                            <ReloadButton />
                        </Col>
                        <Col>
                            <SetRoot />
                        </Col>
                    </Row>
                </Container>
            </Navbar>
        </header>
        <main>
            <Container fluid>
                <Main />
            </Container>
        </main>
        <hr />
        <footer className="text-center mb-3">
            <Container fluid>
                <a href="https://github.com/flopes89/tikett">tikett</a> &copy; Florian Peschka
            </Container>
        </footer>
    </div>
);
