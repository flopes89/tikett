import React from "react";
import { Mutation } from "react-apollo";
import ReloadButton from "../components/reloadButton";
import queries from "../queries";
import { Loading, Error } from "./util";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ReloadButtonContainer = ({ current, showDescendants }) => (
    <Mutation
        mutation={queries.RELOAD_FILES}
        refetchQueries={[
            {
                query: queries.GET_FILES,
                variables: { current, showDescendants }
            }, {
                query: queries.GET_TAG_GROUPS
            }
        ]}
    >
        {(reload, { loading, error }) => {
            if (loading) return <Loading />;
            if (error) return <Error />;
            return <ReloadButton onClick={reload} />;
        }}
    </Mutation>
);

ReloadButtonContainer.propTypes = {
    current: PropTypes.string.isRequired,
    showDescendants: PropTypes.bool.isRequired,
}

export default connect(
    (state) => ({
        current: state.files.current,
        showDescendants: state.files.showDescendants,
    })
)(ReloadButtonContainer);
