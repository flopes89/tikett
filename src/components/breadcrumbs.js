import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { connect } from "react-redux";
import { openFolder } from "../state/fileBrowser";

const CrumbItem = (props) => {
    let inner = props.name;

    if (props.isClickable) {
        inner = (
            <a href="#" onClick={() => props.openFolder(props.path)}>
                {inner}
            </a>
        );
    }

    return (<BreadcrumbItem>{inner}</BreadcrumbItem>);
};

const Crumbs = (props) => (
    <Row>
        <Col>
            <Breadcrumb>
                {props.breadcrumbs.map((breadcrumb, index) => (
                    <CrumbItem
                        key={index}
                        name={breadcrumb.name}
                        path={breadcrumb.path}
                        isClickable={index < (props.breadcrumbs.length - 1)}
                        openFolder={props.openFolder}
                    />
                ))}
            </Breadcrumb>
        </Col>
    </Row>
);

const BreadcrumbsContainer = (props) => {
    const breadcrumbs = [];
    let breadcrumbPath = "/";

    props.current.split("/").forEach((crumb) => {
        if (!crumb) {
            return;
        }

        breadcrumbs.push({
            name: crumb,
            path: breadcrumbPath + crumb,
        });

        breadcrumbPath += crumb + "/";
    });

    breadcrumbs.unshift({
        name: "Home",
        path: "/",
    });

    return (<Crumbs breadcrumbs={breadcrumbs} openFolder={props.openFolder} />);
};

CrumbItem.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    isClickable: PropTypes.bool,
    openFolder: PropTypes.func,
};

Crumbs.propTypes = {
    breadcrumbs: PropTypes.arrayOf(PropTypes.shape(CrumbItem.propTypes)),
    openFolder: PropTypes.func.isRequired,
};

export default connect(
    (state) => ({
        current: state.fileBrowser.currentFolder,
    }),
    (dispatch) => ({
        openFolder: (folder) => dispatch(openFolder(folder)),
    })
)(BreadcrumbsContainer);
