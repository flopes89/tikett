import React from "react";
import { Button } from "reactstrap";
import Octicon, { Sync } from "@githubprimer/octicons-react";
import { Mutation } from "../util";
import queries from "../../queries";
import { connect } from "react-redux";

const ReloadButton = (props) => (
    <Mutation
        mutation={queries.RELOAD_FILES}
        refetchQueries={[
            { query: queries.GET_TAG_GROUPS },
            {
                query: queries.GET_FILES,
                variables: {
                    current: props.current,
                    showDescendants: props.showDescendants
                }
            },
        ]}
    >
        {(mutate) => (
            <Button onClick={mutate}>
                <Octicon icon={Sync} className="mr-1" />
                Reload files
            </Button>
        )}
    </Mutation>
);

export default connect(
    (state) => ({
        current: state.fileBrowser.currentFolder,
        showDescendants: state.fileBrowser.showDescendants,
    })
)(ReloadButton);
