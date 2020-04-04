import { combineReducers } from "redux";
import alert from "./alert";
import authorization from "./authorization";
import quiz from "./quiz";
import classRoom from "./classRoom";

export default combineReducers({
  alert,
  authorization,
  quiz
  classRoom
});
