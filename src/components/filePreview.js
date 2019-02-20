import React from "react";
import { Row, Col, Button, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Octicon, { X } from "@githubprimer/octicons-react";
import { selectFile } from "../state/files";

const FilePreview = (props) => {
    if (!props.src) {
        return null;
    }

    return (
        <Col>
            <Row>
                <Col xs={11}>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            {props.src}
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Col>
                <Col xs={1} className="px-0 pt-2">
                    <Button onClick={props.close}>
                        <Octicon icon={X} />
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <iframe src={props.src} />
                </Col>
            </Row>
        </Col>
    );
};

FilePreview.propTypes = {
    src: PropTypes.string,
};

const FilePreviewContainer = connect(
    (state) => ({
        src: state.files.selected,
    }),
    (dispatch) => ({
        close: () => dispatch(selectFile("")),
    }),
)(FilePreview);

export default FilePreviewContainer;
