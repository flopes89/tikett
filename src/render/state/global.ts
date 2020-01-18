const START_TAG_DRAG = "START_TAG_DRAG";
const END_TAG_DRAG = "END_TAG_DRAG";

export const startTagDrag = () => ({
    type: START_TAG_DRAG,
});

export const endTagDrag = () => ({
    type: END_TAG_DRAG,
});

export default (state = {}, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case START_TAG_DRAG:
            return {
                ...newState,
                isDraggingTag: true,
            };

        case END_TAG_DRAG:
            return {
                ...newState,
                isDraggingTag: false,
            };
    }

    return newState;
};
