import React from "react";
import {
    Container,
    Row,
    Col,
    Navbar,
    NavbarBrand,
} from "reactstrap";
import Files from "./containers/files";
import ReloadButton from "./containers/reloadButton";

export default () => (
    <div>
        <header>
            <Navbar dark className="bg-dark mb-3">
                <Container>
                    <NavbarBrand tag="a" href="/"><strong>tagster</strong></NavbarBrand>
                    <ReloadButton />
                </Container>
            </Navbar>
        </header>
        <main>
            <Container>
                <Row>
                    <Col xs={4}>
                    </Col>
                    <Col>
                        <Files />
                    </Col>
                </Row>
            </Container>
        </main>
        <hr />
        <footer className="text-center">
            <Container>
                tagster &copy; Florian Peschka
            </Container>
        </footer>
    </div>
);
