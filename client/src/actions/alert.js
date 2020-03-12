import { SET_ALERT, REMOVE_ALERT } from "./constants";
import uuid from "uuid";

export const setAlert = (msq, alertType) => despatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
};
