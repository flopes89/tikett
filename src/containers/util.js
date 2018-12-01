import React from "react";
import { Alert } from "reactstrap";

export const Loading = () => (
    <span>Loading...</span>
);

export const Error = () => (
    <Alert color="danger">
        An error ocurred. Check browser log.
    </Alert>
);
