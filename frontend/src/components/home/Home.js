import React, { useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import getToken from "../../utils/getToken";
import { connect } from "react-redux";
import { products } from "../../redux/home/homeReducer";
import { Navbar, Nav, Container, Alert } from "react-bootstrap";
import ProductCard from "./ProductCard";

function Home(props) {
  const { error, message, products, user } = props.reqState;

  const getProducts = props.getProducts;

  useEffect(() => {
    getProducts();
  }, []);

  if (getToken().present) {
    return (
      <>
        <Navbar
          sticky="top"
          collapseOnSelect
          expand="lg"
          bg="success"
          variant="dark"
        >
          <Link to="/home">
            <Navbar.Brand>MyShop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav style={{ marginLeft: `10px` }}>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/create"
              >
                Create Listing
              </Link>
            </Nav>
            <Nav style={{ marginRight: "auto", marginLeft: `10px` }}>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/my/listings"
              >
                My Listings
              </Link>
            </Nav>
            <Nav>
              <Nav style={{ color: "white" }} className="mr-5">
                Welcome {user !== undefined && user.firstName}{" "}
                {user !== undefined && user.lastName}
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {error === true ? (
          <Alert
            className="mt-5"
            style={{ width: `70vw`, margin: "auto", textAlign: "center" }}
            variant="danger"
          >
            {message}
          </Alert>
        ) : (
          <Container style={{ width: `70vw` }}>
            <div
              className="mt-5"
              style={{ textAlign: "center", fontSize: `2rem` }}
            >
              Products
            </div>
            {products !== undefined &&
              products.map((product) => {
                return (
                  <div className="mt-5 mb-5">
                    <ProductCard productInfo={product} />
                  </div>
                );
              })}
          </Container>
        )}
      </>
    );
  } else {
    return <Redirect to="/login"></Redirect>;
  }
}

const mapStateToProps = (state) => {
  return {
    reqState: state.homeReducer.data,
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(products()),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(Home);
