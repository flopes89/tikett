import React from "react";
import { Badge } from "reactstrap";

export default ({ children, color }) => (
    <Badge className="tag" style={{ backgroundColor: color }}>
        {children}
    </Badge>
);
