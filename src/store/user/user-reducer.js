import { USER_ACTION_TYPES } from "./user-types";

const INITIAL_STATE = {
    currentUser: null,
};

// function that returns desired object (currentUser) with updated state based on actions
export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return { ...state, currentUser: payload };
        default:
            return state;
    }
};






// All reducers get the dispatch of all the actions & individually determine if they want to update state
    // thus by default, if this particular reducer does not need to update, just return previous state object from memory