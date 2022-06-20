import { createContext, useReducer, useEffect } from "react"

import { createAction } from '../utilities/reducer-utils';
import { onAuthStateChangedListener, signOutUser, createUserDocumentFromAuth } from "../utilities/firebase-utils";


export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});


export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_STATE = {
    currentUser: null,
};

// function that returns desired object (currentUser) with updated state based on actions
const userReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return { ...state, currentUser: payload };
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
};


export const UserProvider = ({ children }) => {
    // useReducer hook accepts a reducer function & initial state values
    // useReducer hook returns updated state & dispatch function that passes an action into reducer function (switch statements)
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setCurrentUser = (user) =>
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));



    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            // case in which new user signs up from google
            if (user) {
                createUserDocumentFromAuth(user);
            }
            console.log(user);
            // set user to null (on sign-out) or to user object (on sign-in)
            setCurrentUser(user);
        });

        // cleanup/stop listening to auth listener when component unmounts/ observer callback is complete (prevents memory leak since this is an open listener)
        return unsubscribe;
    }, []);

    const value = { currentUser, setCurrentUser };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
