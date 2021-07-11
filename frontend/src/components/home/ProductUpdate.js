import React, { useState, useEffect, useRef } from "react";
import { Redirect, withRouter, useParams } from "react-router-dom";
import getToken from "../../utils/getToken";
import NavBar from "./NavBar";
import { user, update } from "../../redux/home/homeReducer";
import { connect } from "react-redux";
import AlertError from "./AlertError";
import { Container, Form, Button } from "react-bootstrap";
import validator from "../../utils/validation";

function ProductUpdate(props) {
  const { data } = props.reqState;

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("Some of the fields are empty");

  const formRef = useRef(null);

  const getUser = props.getUser;

  const updateProduct = props.updateProduct;

  const { prevQuantity, prevPrice } = props.location.state;

  const id = useParams().id;

  useEffect(() => {
    getUser();
    formRef.current.price.value = prevPrice;
    formRef.current.quantity.value = prevQuantity;
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

  const updateProductAction = (e) => {
    e.preventDefault();
    const price = e.target.price.value;
    const quantity = e.target.quantity.value;

    if (Number(price) === prevPrice && Number(quantity) === prevQuantity) {
      setMessage("Values are same as before");
      setError(true);
    } else {
      const isValid = validator({
        first: price,
        second: quantity,
      });

      if (isValid) {
        updateProduct(id, Number(price), Number(quantity));
      } else {
        setMessage("Some of the fields are empty");
        setError(true);
      }
    }
  };

  if (getToken().present) {
    if (
      data.error !== undefined &&
      data.error === false &&
      data.message === `Product with id ${id} updated successfully!`
    ) {
      return <Redirect to="/my/listings"></Redirect>;
    }
    return (
      <>
        <NavBar user={data.user} />
        {error === true ? (
          <AlertError message={message}></AlertError>
        ) : (
          <span></span>
        )}
        <Container>
          <div
            className="mt-5"
            style={{ textAlign: "center", fontSize: `2rem` }}
          >
            Update Product
          </div>
          <Form ref={formRef} onSubmit={updateProductAction}>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter new price" />
            </Form.Group>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" placeholder="Enter new quantity" />
            </Form.Group>

            <Button variant="warning" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </>
    );
  } else {
    return <Redirect to="/login"></Redirect>;
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
    updateProduct: (id, price, quantity) =>
      dispatch(update(id, price, quantity)),
  };
};

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(withRouter(ProductUpdate));
