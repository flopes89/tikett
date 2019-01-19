import React from "react";
import { Query } from "react-apollo";
import { Row, Col } from "reactstrap";
import queries from "../queries";
import { catchLoadingError } from "./util";
import PropTypes from "prop-types";
import SetRoot from "../components/setRoot";
import TagGroups from "../components/tagGroups";
import Breadcrumbs from "../components/breadcrumbs";
import Files from "../components/files";

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
