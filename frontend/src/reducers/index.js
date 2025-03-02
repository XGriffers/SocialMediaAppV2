import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import postReducer from "./PostReducer";
import chatReducer from "./ChatUserReducer"; // matches export

// smash em together
export const reducers = combineReducers({
  authReducer,
  postReducer,
  chatReducer,
});