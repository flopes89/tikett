import React from "react";
import { Button } from "reactstrap";

export default ({ children, color }) => (
    <Button
        style={{
            backgroundColor: color,
        }}
        size="sm"
    >
        {children}
    </Button>
);
