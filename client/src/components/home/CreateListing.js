import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import { Redirect } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { user, create } from "../../redux/home/homeReducer";
import AlertError from "./AlertError";
import validator from "../../utils/validation";
import getToken from "../../utils/getToken";

function CreateListing(props) {
  const { data } = props.reqState;

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("Some of the fields are empty");
  const getUser = props.getUser;

  const create = props.create;

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (data.error !== undefined) {
      if (data.error === true) {
        setMessage(data.message);
        setError(true);
      } else if (data.error === false) {
        setError(false);
      }
    }
  }, [data]);

  const createProduct = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const quantity = e.target.quantity.value;
    const price = e.target.price.value;

    const isValid = validator({
      first: title,
      second: description,
      third: quantity,
      fourth: price,
    });

    if (isValid) {
      create(title, description, Number(quantity), Number(price));
    } else {
      setError(true);
    }
  };

  if (getToken() === "undefined" || getToken() === null) {
    return <Redirect to="/login"></Redirect>;
  } else {
    if (
      data.error !== undefined &&
      data.error === false &&
      data.message === "Product created successfully!"
    ) {
      return <Redirect to="/home"></Redirect>;
    } else {
      return (
        <>
          <NavBar user={data.user} />

          <Container>
            <div
              className="mt-5"
              style={{ textAlign: "center", fontSize: `2rem` }}
            >
              Add Product
            </div>
            {error === true ? <AlertError message={message} /> : <span></span>}
            <Form onSubmit={createProduct}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name of your product"
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description of your product"
                />
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price of your product"
                />
              </Form.Group>
              <Form.Group controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" placeholder="Enter quantity " />
              </Form.Group>
              <Button variant="warning" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    reqState: state.homeReducer,
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    getUser: () => dispatch(user()),
    create: (title, description, quantity, price) =>
      dispatch(create(title, description, quantity, price)),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(CreateListing);
