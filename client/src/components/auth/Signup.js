import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { doSignup } from "../../redux/auth/authReducer";
import { Form, Button, Container } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import validator from "../../utils/validation";
import AlertError from "../home/AlertError";

function Signup(props) {
  const { authdata } = props.reqState;
  const signup = props.signup;

  const [error, setError] = useState(false);
  const [message, setMessage] = useState(
    "Some of the fields are empty or email is incorrect"
  );

  useEffect(() => {
    if (authdata.error !== undefined) {
      if (authdata.error === true) {
        setMessage(authdata.message);
        setError(true);
      } else if (authdata.error === false) {
        setError(false);
      }
    }
  }, [authdata]);

  const signupAction = (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const isValid = validator({
      first: email,
      second: password,
      third: firstName,
      fourth: lastName,
    });

    if (isValid) {
      signup(firstName, lastName, email, password);
    } else {
      setError(true);
    }
  };

  if (
    authdata.message !== undefined &&
    authdata.message === "User created successfully!"
  ) {
    return <Redirect to="/login"></Redirect>;
  } else {
    return (
      <Container style={{ width: `80vw`, marginTop: `20px` }}>
        <div
          style={{
            textAlign: "center",
            fontSize: `2rem`,
            marginBottom: `8px`,
          }}
        >
          SignUp
        </div>

        {error === true ? <AlertError message={message} /> : <span></span>}

        <Form onSubmit={signupAction}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="success" type="submit">
            SignUp
          </Button>
          <Link to="/login">
            <Button
              style={{ marginLeft: `15px` }}
              variant="warning"
              type="submit"
            >
              Login
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

const mapStateToDispatch = (dispatch) => {
  return {
    signup: (firstName, lastName, email, password) =>
      dispatch(doSignup(firstName, lastName, email, password)),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(Signup);
