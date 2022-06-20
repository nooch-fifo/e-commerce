import { createContext, useState, useEffect } from "react"
import { onAuthStateChangedListener, signOutUser, createUserDocumentFromAuth } from "../utilities/firebase-utils";

// Context allows for state values to be exposed to other components

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// component that wraps around App component and thus any child component of App that needs access to the context/values inside
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

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

    // passing a value into provider allows that state to be called from anywhere in the component tree of the provider 
    const value = { currentUser, setCurrentUser };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
