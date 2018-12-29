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

export const catchLoadingError = (state = {}, showIfError = false) => (component) => {
    if (state.error) {
        return (
            <div>
                <Error />
                {showIfError && component}
            </div>
        );
    }

    // In case of queries, data will always be an object, just empty: render loading
    // in case of mutations, data will be undefined and therefore not an object: don't render loading
    if (state.loading || typeof state.data === "object" && !state.data) {
        return (<Loading />);
    }

    return component;
}
