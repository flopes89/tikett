import { connect } from "react-redux";
import AddTagGroups from "../components/addTagGroup";
import { OPEN_CREATE_NEW_TAG_GROUP_INPUT } from "../reducer";

export default connect(
    (state_) => ({
        isOpen: Boolean(state_.tagGroups.createNewInputOpened),
    }),
    (dispatch_) => ({
        open: () => dispatch_({
            type: OPEN_CREATE_NEW_TAG_GROUP_INPUT,
        }),
    }),
)(AddTagGroups);
