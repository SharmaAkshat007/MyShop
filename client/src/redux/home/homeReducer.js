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

import {
  requestProducts,
  error,
  getProducts,
  getMyProducts,
  getUser,
  createProduct,
  deleteProduct,
  updateProduct,
} from "./homeActions";

import axios from "axios";
import getToken from "../../utils/getToken";

const intitialState = {
  loading: false,
  data: {},
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

    case UPDATE:
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
    const token = getToken();

  

    

    if (token === 'undefined' || token === null) {
      //console.log("null");
      dispatch(
        error({
          error: true,
          message: "Not Authenticated",
        })
      );
    } else {
      dispatch(requestProducts());
      axios
        .get("http://localhost:3000/products/", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(getProducts(res.data));
        })
        .catch((err) => {
          dispatch(error(err.response.data));
        });
    }
  };
};

export const myProducts = () => {
  return function (dispatch) {
    const token = getToken();

    if (token === 'undefined'|| token === null) {
      dispatch(
        error({
          error: true,
          message: "Not Authenticated",
        })
      );
    } else {
      dispatch(requestProducts());
      axios
        .get("http://localhost:3000/products/my/listing", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(getMyProducts(res.data));
        })
        .catch((err) => {
          dispatch(error(err.response.data));
        });
    }
  };
};

export const user = () => {
  return function (dispatch) {
    const token = getToken();
    if (token === 'undefined'|| token === null) {
      dispatch(
        error({
          error: true,
          message: "Not Authenticated",
        })
      );
    } else {
      dispatch(requestProducts());
      axios
        .get("http://localhost:3000/user/", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(getUser(res.data));
        })
        .catch((err) => {
          dispatch(error(err.response.data));
        });
    }
  };
};

export const create = (title, description, quantity, price) => {
  return function (dispatch) {
    const token = getToken();
    if (token === 'undefined'|| token === null) {
      dispatch(
        error({
          error: true,
          message: "Not Authenticated",
        })
      );
    } else {
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
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          dispatch(createProduct(res.data));
        })
        .catch((err) => {
          dispatch(error(err.response.data));
        });
    }
  };
};

export const deleteProd = (id, products) => {
  return function (dispatch) {
    const token = getToken();
    if (token === 'undefined'|| token === null) {
      dispatch(
        error({
          error: true,
          message: "Not Authenticated",
        })
      );
    } else {
      dispatch(requestProducts());
      axios
        .delete(`http://localhost:3000/products/delete/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          res.data.products = products;
          dispatch(deleteProduct(res.data));
        })
        .catch((err) => {
          dispatch(error(err.response.data));
        });
    }
  };
};

export const update = (id, price, quantity) => {
  return function (dispatch) {
    const token = getToken();
    if (token === 'undefined'|| token === null) {
      dispatch(
        error({
          error: true,
          message: "Not Authenticated",
        })
      );
    } else {
      dispatch(requestProducts());
      axios
        .put(
          `http://localhost:3000/products/update/${id}`,
          {
            quantity: quantity,
            price: price,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          dispatch(updateProduct(res.data));
        })
        .catch((err) => {
          dispatch(error(err.response.data));
        });
    }
  };
};
