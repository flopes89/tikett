import React from "react";
import { Alert } from "reactstrap";

export const Loading = () => (
    <Alert color="info">
        Loading...
    </Alert>
);

export const Error = () => (
    <Alert color="danger">
        An error ocurred. Check browser log.
    </Alert>
);
