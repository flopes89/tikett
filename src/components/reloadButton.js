import React from "react";
import { Button } from "reactstrap";
import Octicon, { Sync } from "@githubprimer/octicons-react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import queries from "../queries";
import { catchLoadingError } from "./util";
import { connect } from "react-redux";

const ReloadButton = ({ onClick }) => (
    <Button onClick={onClick}>
        <Octicon icon={Sync} className="mr-1" />
        Reload files
    </Button>
);

ReloadButton.propTypes = {
    onClick: PropTypes.func,
};

const ReloadButtonContainer = ({ current, showDescendants }) => (
    <Mutation
        mutation={queries.RELOAD_FILES}
        refetchQueries={[{
            query: queries.GET_FILES,
            variables: { current, showDescendants }
        }, {
            query: queries.GET_TAG_GROUPS
        }]}
    >
        {(reload, state) => catchLoadingError(state)(<ReloadButton onClick={reload} />)}
    </Mutation>
);

export default connect(
    (state) => ({
        current: state.files.current,
        showDescendants: state.files.showDescendants,
    })
)(ReloadButtonContainer);
