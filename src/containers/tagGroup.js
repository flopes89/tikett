import React from "react";
import { Mutation } from "react-apollo";
import { catchLoadingError } from "./util";
import PropTypes from "prop-types";
import Tag from "../components/tag";
import TagGroup from "../components/tagGroup";
import queries from "../queries";

const TagGroupContainer = (props) => (
    <Mutation
        mutation={queries.REMOVE_TAG_GROUP}
        variables={{ group: props.name }}
        refetchQueries={[
            {
                query: queries.GET_TAG_GROUPS,
            }
        ]}>
        {(remove, state) => catchLoadingError(state)(
            <TagGroup
                name={props.name}
                tags={props.tags}
                remove={remove}
            />
        )}
    </Mutation>
);

TagGroupContainer.propTypes = {
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape(Tag.propTypes)),
};

export default TagGroupContainer;
