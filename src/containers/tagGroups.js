import React from "react";
import { Query } from "react-apollo";
import queries from "../queries";
import TagGroups from "../components/tagGroups";
import { catchLoadingError } from "./util";

const TagGroupsContainer = () => (
    <Query query={queries.GET_TAG_GROUPS}>
        {(state) => catchLoadingError(state)(<TagGroups tagGroups={state.data.tagGroups} />)}
    </Query>
);

TagGroupsContainer.propTypes = {

};

export default TagGroupsContainer;
