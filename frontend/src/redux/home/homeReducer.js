import { GET_PRODUCTS, REQUEST_PRODUCTS, ERROR } from "./homeActionTypes";
import { getProducts, requestProducts, error } from "./homeActions";
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

    default:
      return state;
  }
};

export const products = () => {
  return function (dispatch) {
    dispatch(requestProducts());
    axios
      .get("http://localhost:3000/products/", {
        headers: {
          authorization: `Bearer ${getToken().token}`,
        },
      })
      .then((res) => {
        dispatch(getProducts(res.data));
      })
      .catch((err) => {
        dispatch(error(err.response.data));
      });
  };
};
