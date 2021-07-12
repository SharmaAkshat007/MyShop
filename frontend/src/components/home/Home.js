import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { products } from "../../redux/home/homeReducer";
import { Container } from "react-bootstrap";
import ProductCard from "./ProductCard";
import NavBar from "./NavBar";
import AlertError from "./AlertError";
import getToken from "../../utils/getToken";

function Home(props) {
  const { error, message, products, user } = props.reqState;

  const getProducts = props.getProducts;

  useEffect(() => {
    getProducts();
  }, []);

  if (getToken() === "undefined" || getToken() === null) {
    return <Redirect to="/login"></Redirect>;
  } else {
    return (
      <>
        <NavBar user={user} />
        {error === true ? (
          <AlertError message={message} />
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
                  <div key={product.id} className="mt-5 mb-5">
                    <ProductCard productInfo={product} type="home" />
                  </div>
                );
              })}
          </Container>
        )}
      </>
    );
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
