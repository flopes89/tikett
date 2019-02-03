const ROOT_TOGGLE = "ROOT_TOGGLE";
const ROOT_CHANGE = "ROOT_CHANGE";

export const toggleRoot = () => ({
    type: ROOT_TOGGLE,
});

export const changeRoot = (newRoot) => ({
    type: ROOT_CHANGE,
    newRoot
});

const INIT_STATE = {
    rootOpen: false,
    newRoot: "",
};

export default (state = INIT_STATE, action) => {
    const newState = Object.assign({}, INIT_STATE, state);

    switch (action.type) {
        case ROOT_TOGGLE:
            return {
                ...newState,
                rootOpen: !newState.rootOpen,
            };

        case ROOT_CHANGE:
            return {
                ...newState,
                newRoot: action.newRoot,
            };
    }

    return newState;
};
