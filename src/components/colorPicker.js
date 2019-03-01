import React from "react";
import { SketchPicker } from "react-color";
import PropTypes from "prop-types";
import { Popover, PopoverBody, Button } from "reactstrap";
import { connect } from "react-redux";
import { changeColor, toggleColor, getColorOpenPropName, getColorPropName } from "../state/tagGroups";
import Octicon, { Paintcan } from "@githubprimer/octicons-react";
import { Mutation } from "react-apollo";
import queries from "../queries";
import { catchLoadingError } from "./util";

const ColorPicker = (props) => {
    const onConfirm = (event) => {
        props.toggle();
        props.onConfirm(event);
    };

    return (
        <React.Fragment>
            <a className="ml-2" href="#" onClick={props.toggle} id={"colorPicker-" + props.group}>
                <Octicon icon={Paintcan} verticalAlign="middle" />
            </a>
            <Popover isOpen={props.isOpen} target={"colorPicker-" + props.group} toggle={props.toggle}>
                <PopoverBody>
                    <SketchPicker disableAlpha={true} onChangeComplete={props.onChange} color={props.color} />
                    <Button onClick={onConfirm}>OK</Button>
                </PopoverBody>
            </Popover>
        </React.Fragment>
    )
};

ColorPicker.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
    color: PropTypes.string,
    onChange: PropTypes.func,
    onConfirm: PropTypes.func,
    group: PropTypes.string,
};

const ColorPickerContainer = (props) => (
    <Mutation
        mutation={queries.CHANGE_COLOR}
        variables={{ group: props.group, color: props.color }}
        refetchQueries={[
            {
                query: queries.GET_TAG_GROUPS,
            }, {
                query: queries.GET_FILES,
                variables: {
                    current: props.currentFolder,
                    showDescendants: props.showDescendants,
                }
            }
        ]}
    >
        {(mutate, state) => catchLoadingError(state)(<ColorPicker {...props} onConfirm={mutate} />)}
    </Mutation>
);

ColorPickerContainer.propTypes = {
    isOpen: PropTypes.bool,
    color: PropTypes.string,
    currentFolder: PropTypes.string,
    showDescendants: PropTypes.bool,
    group: PropTypes.string,
    onChange: PropTypes.func,
    toggle: PropTypes.func,
};

export default connect(
    (state, props) => ({
        isOpen: state.tagGroups[getColorOpenPropName(props.group)] || false,
        color: state.tagGroups[getColorPropName(props.group)] || props.color || "",
        currentFolder: state.fileBrowser.currentFolder,
        showDescendants: state.fileBrowser.showDescendants,
    }),
    (dispatch, props) => ({
        toggle: () => dispatch(toggleColor(props.group)),
        onChange: (color) => dispatch(changeColor(props.group, color)),
    }),
)(ColorPickerContainer);
