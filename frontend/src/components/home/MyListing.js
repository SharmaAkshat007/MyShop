import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import getToken from "../../utils/getToken";
import { myProducts } from "../../redux/home/homeReducer";
import { Container } from "react-bootstrap";
import ProductCard from "./ProductCard";
import AlertError from "./AlertError";

function MyListing(props) {
  const { error, message, user, products } = props.reqState;

  const getMyProducts = props.getMyProducts;

  useEffect(() => {
    getMyProducts();
  }, []);

  if (getToken().present) {
    return (
      <>
        <NavBar user={user} />
        {error === true ? <AlertError message={message} /> : <span></span>}
        <Container style={{ width: `70vw` }}>
          <div
            className="mt-5"
            style={{ textAlign: "center", fontSize: `2rem` }}
          >
            My Products
          </div>
          {products !== undefined &&
            products.map((product) => {
              return (
                <div key={product.id} className="mt-5 mb-5">
                  <ProductCard productInfo={product} type="myListing" />
                </div>
              );
            })}
        </Container>
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
    getMyProducts: () => dispatch(myProducts()),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(MyListing);
