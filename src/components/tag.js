import React from "react";
import { Badge } from "reactstrap";

export default ({ children, color }) => (
    <Badge
        style={{
            backgroundColor: color,
        }}
    >
        {children}
    </Badge>
);
