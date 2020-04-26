import { combineReducers } from "redux";
import alert from "./alert";
import authorization from "./authorization";
import quiz from "./quiz";
import classRoom from "./classRoom";
import career from "./career";

export default combineReducers({
  alert,
  authorization,
  quiz,
  classRoom,
  career
});
