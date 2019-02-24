import React from "react";
import { Badge, Input } from "reactstrap";
import Octicon, { Plus } from "@githubprimer/octicons-react";
import { Mutation } from "react-apollo";
import queries from "../queries";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { catchLoadingError } from "./util";
import { CONFIRM_KEYS } from "../const";
import { toggleAddTag, changeAddTag, getAddTagNamePropName, getAddTagOpenPropName } from "../state/files";

const AddTag = (props) => {
    const onKeyPress = (event) => {
        if (CONFIRM_KEYS.indexOf(event.which) !== -1) {
            props.confirm(props.file);
        }
    };

    if (props.isOpen) {
        return (
            <Input
                innerRef={(ref) => ref && ref.focus()}
                value={props.name}
                onChange={(event) => props.change(event.target.value)}
                onBlur={props.abort}
                onKeyPress={onKeyPress}
                placeholder="Press enter to confirm"
            />
        );
    }

    return (
        <Badge className="add_tag" color="primary" onClick={() => props.open(props.path)}>
            <Octicon icon={Plus} height={12} verticalAlign="text-top" />
        </Badge>
    );
};

AddTag.propTypes = {
    open: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
    abort: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
};

const AddTagContainer = (props) => (
    <Mutation
        mutation={queries.ADD_TAG}
        variables={{
            name: props.name,
            path: props.path,
        }}
        refetchQueries={[
            {
                query: queries.GET_FILES,
                variables: {
                    current: props.current,
                    showDescendants: props.showDescendants,
                }
            },
            {
                query: queries.GET_TAG_GROUPS,
            },
            {
                query: queries.GET_TAGS,
            }
        ]}
        update={props.confirm}
    >
        {(addTag, state) => catchLoadingError(state)(<AddTag {...props} confirm={addTag} />)}
    </Mutation>
);

export default connect(
    (state, props) => ({
        name: state.files[getAddTagNamePropName(props.path)] || "",
        isOpen: state.files[getAddTagOpenPropName(props.path)] || false,
        current: state.fileBrowser.currentFolder,
        showDescendants: state.fileBrowser.showDescendants,
    }),
    (dispatch, props) => ({
        open: () => dispatch(toggleAddTag(props.path)),
        confirm: () => dispatch(toggleAddTag(props.path)),
        abort: () => dispatch(toggleAddTag(props.path)),
        change: (name) => dispatch(changeAddTag(props.path, name)),
    }),
)(AddTagContainer);
