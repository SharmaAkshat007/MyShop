import React from "react";
import { Redirect } from "react-router-dom";
import getToken from "../utils/getToken";

function Wrapper() {
  if (getToken() === null || getToken() === 'undefined') {
    return <Redirect to="/login"></Redirect>;
  } else {
    return <Redirect to="/home"></Redirect>;
  }
}

export default Wrapper;
