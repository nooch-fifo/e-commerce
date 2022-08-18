import { combineReducers } from "redux";
import { userReducer } from "./user/user-reducer";


// All reducers get combined into one root reducer.
export const rootReducer = combineReducers({
    user: userReducer,
});