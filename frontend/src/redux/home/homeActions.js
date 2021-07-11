import { GET_PRODUCTS, REQUEST, ERROR } from "./homeActionTypes";

export const getProducts = (data) => {
  return {
    type: GET_PRODUCTS,
    payload: data,
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
