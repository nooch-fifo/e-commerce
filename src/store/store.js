import { compose, createStore, applyMiddleware } from 'redux'
// ^recommended to use configureStore method of Redux toolkit. using Redux core package just for learning purposes
import { logger } from 'redux-logger';
import { rootReducer } from './root-reducer';


// action comes to middleware before hitting reducers & log state (enhance our store)
const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares));

// root-reducer
export const store = createStore(rootReducer, undefined, composedEnhancers);

















// Redux will always wrap the entire App. All state is stored in Redux Store & all parts have access (global state management)
// Context can wrap Providers around scpecific parts of the App & isolate the accessibility to children components

// Redux Store is a much more singular flow of data (Single Source of Truth).
    // All reducers get combined into one root reducer.
    // Root reducer passes entire state to all components.
    // Components have a singular dispatch of actions 
    // All reducers get the dispatch of all the actions & individually determine if they want to update state