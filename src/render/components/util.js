import React from "react";
import { Alert } from "reactstrap";
import { Query as ApolloQuery, Mutation as ApolloMutation } from "react-apollo";

export const Loading = () => (
    <Alert color="info">
        Loading...
    </Alert>
);

export const Error = () => (
    <Alert color="danger">
        An error ocurred. Check browser log for details.
    </Alert>
);

export const Query = (props) => (
    <ApolloQuery {...props}>
        {(state) => {
            if (state.loading) return (<Loading />);
            if (state.error) return (<Error />);
            return props.children(state.data);
        }}
    </ApolloQuery>
);

Query.displayName = "QueryStateBoundary";

export const Mutation = (props) => (
    <ApolloMutation {...props}>
        {(mutate, state) => (
            <React.Fragment>
                {state.loading && (<Loading />)}
                {state.error && (<Error />)}
                {props.children(mutate, state)}
            </React.Fragment>
        )}
    </ApolloMutation>
);

Mutation.displayName = "MutationStateBoundary";
