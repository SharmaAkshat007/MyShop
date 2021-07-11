import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import getToken from "../utils/getToken";

function Wrapper(props) {
  if (getToken()) {
    return <Redirect to="/home"></Redirect>;
  } else {
    return <Redirect to="/login"></Redirect>;
  }
}

const mapStateToProps = (state) => {
  return {
    reqState: state.authReducer,
  };
};
export default connect(mapStateToProps)(Wrapper);
