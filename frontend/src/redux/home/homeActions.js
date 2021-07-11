import { GET_PRODUCTS, REQUEST_PRODUCTS, ERROR } from "./homeActionTypes";

export const getProducts = (data) => {
  return {
    type: GET_PRODUCTS,
    payload: data,
  };
};

export const requestProducts = () => {
  return {
    type: REQUEST_PRODUCTS,
  };
};

export const error = (err) => {
  return {
    type: ERROR,
    payload: err,
  };
};
