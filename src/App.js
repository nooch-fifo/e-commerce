import Home from "./routes/Home";
import Navbar from "./routes/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./routes/Authentication";
import Shop from "./routes/Shop";
import Checkout from "./routes/Checkout";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/user/user-action";
import { onAuthStateChangedListener, signOutUser, createUserDocumentFromAuth } from "./utilities/firebase-utils";


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      // case in which new user signs up from google
      if (user) {
        createUserDocumentFromAuth(user);
      }
      console.log(user);
      // set user to null (on sign-out) or to user object (on sign-in)
      dispatch(setCurrentUser(user));
    });

    // cleanup/stop listening to auth listener when component unmounts/ observer callback is complete (prevents memory leak since this is an open listener)
    return unsubscribe;
  }, []);


  
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};


export default App;