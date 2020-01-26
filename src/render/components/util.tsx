import React from "react";
import { Alert } from "reactstrap";

export const Loading: React.FC = () => (
    <Alert color="info">
        Loading...
    </Alert>
);

type ErrProps = {
    err: string;
};

export const Error: React.FC<ErrProps> = (props) => (
    <Alert color="danger">
        <p>
            An error ocurred. Check browser log for details.
        </p>
        <p>
            {props.err}
        </p>
    </Alert>
);
