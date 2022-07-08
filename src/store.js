import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

const initialState = {};

const middlewares = [thunkMiddleware];

export const Store = createStore(
  initialState,
  compose(
    applyMiddleware(...middlewares),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
