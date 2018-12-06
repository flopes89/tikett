import React from "react";
import { Mutation } from "react-apollo";
import { catchLoadingError } from "./util";
import TagGroup from "../components/tagGroup";
import queries from "../queries";

const TagGroupContainer = (props) => {
    const update = (cache, { data: { removeTagGroup } }) => {
        cache.writeQuery({
            query: queries.GET_TAG_GROUPS,
            data: {
                tagGroups: removeTagGroup,
            }
        });
    };

    return (
        <Mutation mutation={queries.REMOVE_TAG_GROUP} variables={{ group: props.name }} update={update}>
            {(remove, state) => catchLoadingError(state)(<TagGroup {...props} remove={remove} />)}
        </Mutation>
    );
};

export default TagGroupContainer;
