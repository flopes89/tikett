import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";

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

Breadcrumb.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    isClickable: PropTypes.bool,
    openFolder: PropTypes.func,
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

Crumbs.propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    openFolder: PropTypes.func,
};

export default Crumbs;
