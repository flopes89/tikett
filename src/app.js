import React from "react";
import { Container, Navbar, NavbarBrand } from "reactstrap";
import ReloadButton from "./containers/reloadButton";
import Octicon, { Tag } from "@githubprimer/octicons-react";
import Main from "./containers/main";

export default () => (
    <div>
        <header>
            <Navbar dark className="bg-dark mb-3">
                <Container>
                    <NavbarBrand tag="a" href="/">
                        <h1><Octicon icon={Tag} size="medium" /> tikett</h1>
                    </NavbarBrand>
                    <ReloadButton />
                </Container>
            </Navbar>
        </header>
        <main>
            <Container>
                <Main />
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
