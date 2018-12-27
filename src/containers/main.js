import React from "react";
import { Query } from "react-apollo";
import { Row, Col } from "reactstrap";
import queries from "../queries";
import { catchLoadingError } from "./util";
import PropTypes from "prop-types";
import SetRoot from "./setRoot";
import TagGroups from "../containers/tagGroups";
import Breadcrumbs from "../containers/breadcrumbs";
import Files from "../containers/files";

const Main = (props) => {
    if (props.config.root) {
        return (
            <Row>
                <Col xs={4}>
                    <TagGroups />
                </Col>
                <Col>
                    <Breadcrumbs />
                    <Files />
                </Col>
            </Row>
        );
    }

    return (
        <Row>
            <Col>
                <SetRoot />
            </Col>
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
