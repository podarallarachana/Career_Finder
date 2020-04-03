import { combineReducers } from "redux";
import alert from "./alert";
import authorization from "./authorization";
import quiz from "./quiz";

export default combineReducers({
  alert,
  authorization,
  quiz
});
