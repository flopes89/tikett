import React from "react";
import { Query } from "react-apollo";
import Files from "../components/files"
import queries from "../queries";
import { Loading, Error } from "./util";

export default () => (
    <Query query={queries.GET_FILES}>
        {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return <Error />;
            return <Files files={data.files} />;
        }}
    </Query>
);
