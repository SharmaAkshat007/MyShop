import { LOGIN, SIGNUP, REQUEST, ERROR, LOGOUT } from "./authActionTypes";

export const login = (result) => {
  return {
    type: LOGIN,
    payload: result,
  };
};

export const signup = (result) => {
  return {
    type: SIGNUP,
    payload: result,
  };
};

export const request = () => {
  return {
    type: REQUEST,
  };
};

export const error = (err) => {
  return {
    type: ERROR,
    payload: err,
  };
};

export const logout = (data) => {
  return {
    type: LOGOUT,
    payload: data,
  };
};
