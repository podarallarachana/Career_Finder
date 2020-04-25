import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utilities/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./constants";
// LOAD USER
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
//REGISTER USER
export const register = ({
  first_name,
  last_name,
  email,
  password,
  is_teacher,
  code,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //FOR NOW JUST TAKE CARE OF EMPTY CODES, CODE LOGIC NEEDS TO BE ADDED LATER
  if (code === "" && is_teacher === false) {
    code = "NA";
  }
  // if (code === "" && is_teacher === false) {
  //   //STUDENT DOESN'T HAVE A CODE
  //   code = "NA";
  // } else if (is_teacher === true) {
  //   //IF IT IS A TEACHER, GENERATE A NEW CODE
  //   code = uuidv4();
  // }
  const body = JSON.stringify({
    first_name,
    last_name,
    email,
    password,
    is_teacher,
    code,
  });
  try {
    const res = await axios.post("/api/user", body, config);
<<<<<<< HEAD
=======

>>>>>>> 7f2e28f63a416644c25c8fc9f05f33e53ff13850
    //await axios.post("/api/class/student", {id: code,studentId: first_name});

    //also create a student object using email

<<<<<<< HEAD

=======
>>>>>>> 7f2e28f63a416644c25c8fc9f05f33e53ff13850
    //ON SUCCESFUL POST, SEND SUCCESS ALERT
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    //ON UNSUCCESSFUL POST, SEND ERROR ALERTS
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
//LOGIN USER
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    email,
    password,
  });
  try {
    const res = await axios.post("/api/auth", body, config);
    //ON SUCCESFUL POST, SEND SUCCESS ALERT
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    //ON UNSUCCESSFUL POST, SEND ERROR ALERTS
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
// CLEAR PROFILE ON LOGOUT
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
