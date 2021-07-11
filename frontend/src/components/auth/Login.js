import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { doLogin } from "../../redux/auth/authReducer";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import validator from "../../utils/validation";
import getToken from "../../utils/getToken";

function Login(props) {
  const { data } = props.reqState;
  const login = props.login;

  const [error, setError] = useState(false);
  const [message, setMessage] = useState(
    "Some of the fields are empty or email is incorrect"
  );

  useEffect(() => {
    if (data.error !== undefined) {
      if (data.error === true) {
        setMessage(data.message);
        setError(true);
      } else if (data.error === false) {
        setError(false);
        localStorage.setItem("jwt-token", data.jwtToken);
      }
    }
  }, [data]);

  const loginAction = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const isValid = validator({
      email,
      password,
    });

    if (isValid) {
      login(email, password);
    } else {
      setError(true);
    }
  };

  if (data.error !== undefined && data.error === false && getToken().present) {
    return <Redirect to="/home"></Redirect>;
  } else {
    return (
      <Container style={{ width: `80vw`, marginTop: `20px` }}>
        <div
          style={{ textAlign: "center", fontSize: `2rem`, marginBottom: `8px` }}
        >
          Login
        </div>
        {error === true ? (
          <Alert variant="danger">{message}</Alert>
        ) : (
          <span></span>
        )}
        <Form onSubmit={loginAction}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="success" type="submit">
            Login
          </Button>
          <Link to="/signup">
            <Button
              style={{ marginLeft: `15px` }}
              variant="warning"
              type="submit"
            >
              SignUp
            </Button>
          </Link>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reqState: state.authReducer,
  };
};

const mapStateTpDispatch = (dispatch) => {
  return {
    login: (email, password) => dispatch(doLogin(email, password)),
  };
};

export default connect(mapStateToProps, mapStateTpDispatch)(Login);
