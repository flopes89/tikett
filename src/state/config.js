const ROOT_TOGGLE = "ROOT_TOGGLE";
const ROOT_CHANGE = "ROOT_CHANGE";

export const toggleRoot = () => ({
    type: ROOT_TOGGLE,
});

export const changeRoot = (newRoot) => ({
    type: NEWTAG_CHANGE,
    newRoot
});

export default (state = {}, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case ROOT_TOGGLE:
            return {
                ...newState,
                rootOpen: !newState.rootOpen,
            };
    }
};
