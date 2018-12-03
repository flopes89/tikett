import React from "react";
import { connect } from "react-redux";
import * as actions from "../reducer";
import Breadcrumbs from "../components/breadcrumbs";

const BreadcrumbsContainer = (props) => {
    const breadcrumbs = [];
    let breadcrumbPath = "/";

    props.current.split("/").forEach((crumb_) => {
        if (!crumb_) {
            return;
        }

        breadcrumbs.push({
            name: crumb_,
            path: breadcrumbPath + crumb_,
        });

        breadcrumbPath += crumb_ + "/";
    });

    breadcrumbs.unshift({
        name: "Home",
        path: "/",
    });

    return (<Breadcrumbs breadcrumbs={breadcrumbs} openFolder={props.openFolder} />);
};

export default connect(
    (state) => ({
        current: state.files.current,
    }),
    (dispatch) => ({
        openFolder: (folder) => dispatch({
            type: actions.FILES_NAVIGATE,
            folder,
        }),
    })
)(BreadcrumbsContainer);
