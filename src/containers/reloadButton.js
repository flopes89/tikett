import React from "react";
import { Mutation } from "react-apollo";
import ReloadButton from "../components/reloadButton";
import queries from "../queries";
import { Loading, Error } from "./util";

const update = (cache_, { files }) => {
    cache_.writeQuery({
        query: queries.GET_FILES,
        data: {
            files,
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
