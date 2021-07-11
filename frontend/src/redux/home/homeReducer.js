import {
  GET_PRODUCTS,
  REQUEST_PRODUCTS,
  ERROR,
  GET_MY_PRODUCTS,
  GET_USER,
  CREATE_PRODUCT,
  DELETE,
} from "./homeActionTypes";

import {
  requestProducts,
  error,
  getProducts,
  getMyProducts,
  getUser,
  createProduct,
  deleteProduct,
} from "./homeActions";

import axios from "axios";
import getToken from "../../utils/getToken";

const intitialState = {
  loading: false,
  data: {},
};

const options = {
  headers: {
    authorization: `Bearer ${getToken().token}`,
  },
};

export const homeReducer = (state = intitialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        loading: false,
        data: action.payload,
      };

    case REQUEST_PRODUCTS:
      return {
        ...state,
        loading: true,
      };

    case ERROR:
      return {
        loading: false,
        data: action.payload,
      };

    case GET_MY_PRODUCTS:
      return {
        loading: false,
        data: action.payload,
      };

    case GET_USER:
      return {
        loading: false,
        data: action.payload,
      };

    case CREATE_PRODUCT:
      return {
        loading: false,
        data: action.payload,
      };

    case DELETE:
      return {
        loading: false,
        data: action.payload,
      };

    default:
      return state;
  }
};

export const products = () => {
  return function (dispatch) {
    dispatch(requestProducts());
    axios
      .get("http://localhost:3000/products/", options)
      .then((res) => {
        dispatch(getProducts(res.data));
      })
      .catch((err) => {
        dispatch(error(err.response.data));
      });
  };
};

export const myProducts = () => {
  return function (dispatch) {
    dispatch(requestProducts());
    axios
      .get("http://localhost:3000/products/my/listing", options)
      .then((res) => {
        dispatch(getMyProducts(res.data));
      })
      .catch((err) => {
        dispatch(error(err.response.data));
      });
  };
};

export const user = () => {
  return function (dispatch) {
    dispatch(requestProducts());
    axios
      .get("http://localhost:3000/user/", options)
      .then((res) => {
        dispatch(getUser(res.data));
      })
      .catch((err) => {
        dispatch(error(err.response.data));
      });
  };
};

export const create = (title, description, quantity, price) => {
  return function (dispatch) {
    dispatch(requestProducts());

    axios
      .post(
        "http://localhost:3000/products/create",
        {
          title: title,
          description: description,
          price: price,
          quantity: quantity,
        },
        options
      )
      .then((res) => {
        dispatch(createProduct(res.data));
      })
      .catch((err) => {
        dispatch(error(err.response.data));
      });
  };
};

export const deleteProd = (id, products) => {
  return function (dispatch) {
    dispatch(requestProducts());
    axios
      .delete(`http://localhost:3000/products/delete/${id}`, options)
      .then((res) => {
        res.data.products = products;
        dispatch(deleteProduct(res.data));
      })
      .catch((err) => {
        dispatch(error(err.response.data));
      });
  };
};
