import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from "../actions/constants";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL: //CLEARS AUTH STATE AND TOKEN FOR LOCAL STORAGE TO PREVENT INVALID TOKEN STORAGE
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        ...null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
