import React from "react";
import { Button } from "reactstrap";
import Octicon, { Sync } from "@githubprimer/octicons-react";

export default ({ onClick }) => (
    <Button onClick={onClick}>
        <Octicon icon={Sync} className="mr-1" />
        Reload files
    </Button>
);
