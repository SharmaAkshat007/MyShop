import { LOGIN, SIGNUP, REQUEST, ERROR, LOGOUT } from "./authActionTypes";
import { login, signup, request, error, logout } from "./authAction";

import axios from "axios";

const intitialState = {
  loading: false,
  authdata: {},
};

export const authReducer = (state = intitialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        loading: false,
        authdata: action.payload,
      };
    case SIGNUP:
      return {
        loading: false,
        authdata: action.payload,
      };

    case REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ERROR:
      return {
        loading: false,
        authdata: action.payload,
      };
    case LOGOUT:
      return {
        loading: false,
        authdata: action.payload,
      };

    default:
      return state;
  }
};

export const doLogin = (email, password) => {
  return function (dispatch) {
    dispatch(request());
    axios
      .post("http://localhost:3000/auth/login/", {
        email: email,
        password: password,
      })
      .then((res) => {
        dispatch(login(res.data));
      })
      .catch((err) => {
        dispatch(error(err.response.data));
      });
  };
};

export const doSignup = (firstName, lastName, email, password) => {
  return function (dispatch) {
    dispatch(request());
    axios
      .post("http://localhost:3000/auth/signup/", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      })
      .then((res) => {
        dispatch(signup(res.data));
      })
      .catch((err) => {
        dispatch(error(err.response.data));
      });
  };
};

export const doLogout = () => {
  return function (dispatch) {
    dispatch(request());
    sessionStorage.removeItem("jwt-token");
    dispatch(
      logout({
        error: false,
        message: "Logged out!",
      })
    );
  };
};
