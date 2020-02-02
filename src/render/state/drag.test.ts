import { dragReducer, ACTION, DragState } from "./drag";

it("handles dragstart action", () => {
    const oldState: DragState = {
        isDraggingTag: false,
    };

    const newState = dragReducer(oldState, {
        type: ACTION.START_TAG_DRAG,
    });

    expect.assertions(2);
    expect(newState).not.toBe(oldState);
    expect(newState.isDraggingTag).toBeTruthy();
});

it("handles dragend action", () => {
    const oldState: DragState = {
        isDraggingTag: true,
    };

    const newState = dragReducer(oldState, {
        type: ACTION.END_TAG_DRAG,
    });

    expect.assertions(2);
    expect(newState).not.toBe(oldState);
    expect(newState.isDraggingTag).toBeFalsy();
});
