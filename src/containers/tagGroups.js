import React from "react";
import { Query } from "react-apollo";
import queries from "../queries";
import { Loading, Error } from "./util";
import TagGroups from "../components/tagGroups";

export default () => (
    <Query query={queries.GET_TAG_GROUPS}>
        {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return <Error />;
            return (
                <TagGroups tagGroups={data.tagGroups} />
            );
        }}
    </Query>
);
