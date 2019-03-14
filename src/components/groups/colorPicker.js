import React, { useState } from "react";
import { SketchPicker } from "react-color";
import PropTypes from "prop-types";
import { Popover, PopoverBody, Button } from "reactstrap";
import { connect } from "react-redux";
import Octicon, { Paintcan } from "@githubprimer/octicons-react";
import { Mutation } from "../util";
import queries from "../../queries";

const ColorPicker = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState(props.color);

    const onConfirm = () => {
        setIsOpen(false);
        props.onConfirm();
    };

    return (
        <React.Fragment>
            <a className="ml-2" href="#" onClick={() => setIsOpen(true)} id={"colorPicker_" + props.group}>
                <Octicon icon={Paintcan} verticalAlign="middle" />
            </a>
            <Popover isOpen={isOpen} target={"colorPicker_" + props.group} toggle={() => setIsOpen(!isOpen)}>
                <PopoverBody>
                    <SketchPicker disableAlpha={true} onChangeComplete={setColor} color={color} />
                    <Button onClick={onConfirm}>OK</Button>
                </PopoverBody>
            </Popover>
        </React.Fragment>
    )
};

const ColorPickerContainer = (props) => (
    <Mutation
        mutation={queries.CHANGE_COLOR}
        variables={{
            group: props.group,
            color: props.color,
        }}
        refetchQueries={[
            { query: queries.GET_TAG_GROUPS, },
            {
                query: queries.GET_FILES,
                variables: {
                    current: props.currentFolder,
                    showDescendants: props.showDescendants,
                }
            }
        ]}
    >
        {(mutate) => (<ColorPicker group={props.group} color={props.color} onConfirm={mutate} />)}
    </Mutation>
);

ColorPickerContainer.propTypes = {
    group: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};

export default connect(
    (state) => ({
        currentFolder: state.fileBrowser.currentFolder,
        showDescendants: state.fileBrowser.showDescendants,
    }),
)(ColorPickerContainer);
