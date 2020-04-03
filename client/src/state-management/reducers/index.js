import { combineReducers } from "redux";
import alert from "./alert";
import authorization from "./authorization";
import classRoom from "./classRoom";

export default combineReducers({
  alert,
  authorization,
  classRoom
});
