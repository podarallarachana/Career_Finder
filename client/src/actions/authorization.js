import axios from "axios";
import { setAlert } from "./alert";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./constants";

//REGISTER USER
export const register = ({
  first_name,
  last_name,
  email,
  password,
  is_teacher,
  code
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    first_name,
    last_name,
    email,
    password,
    is_teacher,
    code
  });

  try {
    const res = await axios.post("/api/user", body, config);

    //ON SUCCESFUL POST, SEND SUCCESS ALERT
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    //ON UNSUCCESSFUL POST, SEND ERROR ALERTS
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
