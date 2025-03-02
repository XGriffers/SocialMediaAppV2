import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducers } from "../reducers";

const store = createStore(reducers, applyMiddleware(thunk)); // basic af

export default store;