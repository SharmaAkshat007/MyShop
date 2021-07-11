import { LOGIN, SIGNUP, REQUEST, ERROR } from "./authActionTypes";
import { login, signup, request, error } from "./authAction";

import axios from "axios";

const intitialState = {
  loading: false,
  isAuthenticated: false,
  data: {},
};

export const authReducer = (state = intitialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        loading: false,
        isAuthenticated: true,
        data: action.payload,
      };
    case SIGNUP:
      return {
        loading: false,
        isAuthenticated: false,
        data: action.payload,
      };

    case REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ERROR:
      return {
        loading: false,
        isAuthenticated: false,
        data: action.payload,
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
