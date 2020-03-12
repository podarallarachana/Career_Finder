import { combineReducers } from "redux";
import alert from "./alert";
import authorization from "./authorization";

export default combineReducers({
  alert,
  authorization
});
