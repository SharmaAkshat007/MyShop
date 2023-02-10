import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { myProducts, deleteProd } from "../../redux/home/homeReducer";
import { Container } from "react-bootstrap";
import ProductCard from "./ProductCard";
import AlertError from "./AlertError";
import getToken from "../../utils/getToken";

function MyListing(props) {
  const { error, message, user } = props.reqState.data;

  let { products } = props.reqState.data;

  const getMyProducts = props.getMyProducts;

  const deleteProduct = props.deleteProduct;

  useEffect(() => {
    getMyProducts();
  }, []);

  const deleteProductAction = (id) => {
    products = products.filter((product) => product.id !== id);

    deleteProduct(id, products);
  };

  if (getToken() === "undefined" || getToken() === null) {
    return <Redirect to="/login"></Redirect>;
  } else {
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
                  <ProductCard
                    deleteProductAction={deleteProductAction}
                    productInfo={product}
                    type="myListing"
                  />
                </div>
              );
            })}
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reqState: state.homeReducer,
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    getMyProducts: () => dispatch(myProducts()),
    deleteProduct: (id, products) => dispatch(deleteProd(id, products)),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(MyListing);
