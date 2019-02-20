import React from "react";
import { addFilter, removeFilter } from "../state/fileBrowser";
import ReactTags from "react-tag-autocomplete";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import queries from "../queries";
import { catchLoadingError } from "./util";

const Filter = (props) => {
    const filters = props.filters.map((filter) => ({
        id: filter,
        name: filter,
    }));

    const suggestions = props.suggestions.map((tag) => ({
        id: tag,
        name: tag,
    }));

    return (
        <ReactTags
            tags={filters}
            suggestions={suggestions}
            handleAddition={props.addFilter}
            handleDelete={props.removeFilter}
            placeholder="Tag filters"
            autoresize={false}
            delimiters={[32]}
        />
    );
};

Filter.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.string),
    addFilter: PropTypes.func,
    removeFilter: PropTypes.func,
    suggestions: PropTypes.arrayOf(PropTypes.string),
};

const FilterContainer = (props) => (
    <Query
        query={queries.GET_TAGS}
    >
        {(state) => catchLoadingError(state)(<Filter {...props} suggestions={state.data.tags} />)}
    </Query>
);

FilterContainer.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.string),
    addFilter: PropTypes.func,
    removeFilter: PropTypes.func,
};

export default connect(
    (state) => ({
        filters: state.fileBrowser.filters || [],
    }),
    (dispatch) => ({
        addFilter: (filter) => dispatch(addFilter(filter)),
        removeFilter: (index) => dispatch(removeFilter(index)),
    }),
)(FilterContainer);
