import React from "react";
import { Alert } from "reactstrap";
import { renderComponent, branch, compose, withProps } from "recompose";

const renderWhileLoading = (component_, propName_ = "data") => branch(
    (props) => props[propName_] && props[propName_].loading,
    renderComponent(component_),
);

const renderForError = (component_, propName_ = "data") => branch(
    (props) => props[propName_] && props[propName_].error,
    renderComponent(component_),
);

const LoadingComponent = () => (
    <span>Loading...</span>
);

const ErrorComponent = (props) => (
    <Alert color="danger">
        {props.data.error.toString()}<br />
        <button onClick={props.refetch}>refetch</button>
    </Alert>
);

const setRefetchProp = (propName_ = "data") => withProps((props) => ({
    refetch: props[propName_] && props[propName_].data,
}));

export default (propName_) => compose(
    renderWhileLoading(LoadingComponent, propName_),
    setRefetchProp(propName_),
    renderForError(ErrorComponent, propName_),
);
