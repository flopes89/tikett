import React from "react";
import { Query } from "react-apollo";
import { Alert, Row, Col } from "reactstrap";
import queries from "../queries";
import { catchLoadingError } from "./util";
import PropTypes from "prop-types";
import TagGroups from "./tagGroups";
import Breadcrumbs from "./breadcrumbs";
import Files from "./files";
import FilePreview from "./filePreview";

const Main = (props) => {
    if (!props.config.root) {
        return (
            <Alert color="info">
                No root set. Click "Change root" to set the root folder for your database.
            </Alert>
        );
    }

    return (
        <Row>
            <Col xs={2}>
                <TagGroups />
            </Col>
            <Col>
                <Breadcrumbs />
                <Files />
            </Col>
            <FilePreview />
        </Row>
    );
};

Main.propTypes = {
    config: PropTypes.shape({
        root: PropTypes.string,
    }),
};

const MainContainer = () => (
    <Query query={queries.GET_CONFIG}>
        {(state) => catchLoadingError(state)(
            <Main config={state.data.config} />
        )}
    </Query>
);

export default MainContainer;
