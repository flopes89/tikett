import React from "react";
import { Mutation } from "react-apollo";
import ReloadButton from "../components/reloadButton";
import queries from "../queries";
import { Loading, Error } from "./util";

const update = (cache_, { data: { reload } }) => {
    cache_.writeQuery({
        query: queries.GET_FILES,
        data: {
            files: reload,
        }
    });
};

export default () => (
    <Mutation
        mutation={queries.RELOAD_FILES}
        update={update}
    >
        {(reload_, { loading, error }) => {
            if (loading) return <Loading />;
            if (error) return <Error />;
            return <ReloadButton onClick={reload_} />;
        }}
    </Mutation>
);
