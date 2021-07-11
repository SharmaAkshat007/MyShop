import {
  GET_PRODUCTS,
  REQUEST_PRODUCTS,
  ERROR,
  GET_MY_PRODUCTS,
  GET_USER,
  CREATE_PRODUCT,
  DELETE,
  UPDATE,
} from "./homeActionTypes";

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

export const getMyProducts = (data) => {
  return {
    type: GET_MY_PRODUCTS,
    payload: data,
  };
};

export const getUser = (data) => {
  return {
    type: GET_USER,
    payload: data,
  };
};

export const createProduct = (data) => {
  return {
    type: CREATE_PRODUCT,
    payload: data,
  };
};

export const deleteProduct = (data) => {
  return {
    type: DELETE,
    payload: data,
  };
};

export const updateProduct = (data) => {
  return {
    type: UPDATE,
    payload: data,
  };
};
