import React, { useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import getToken from "../../utils/getToken";
import { connect } from "react-redux";
import { products } from "../../redux/home/homeReducer";
import { doLogout } from "../../redux/auth/authReducer";
import { Navbar, Nav, Button } from "react-bootstrap";

function Home(props) {
  const { error, products, user } = props.reqState;

  const getProducts = props.getProducts;
  const doLogout = props.logout;

  useEffect(() => {
    getProducts();
  }, []);

  const logout = (e) => {
    doLogout();
    window.location.reload(false);
  };

  if (getToken().present) {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
          <Link to="/home">
            <Navbar.Brand>MyShop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/home"
              >
                MyListings
              </Link>
            </Nav>
            <Nav>
              <Nav style={{ color: "white" }} className="mr-5">
                Welcome {user !== undefined && user.firstName}{" "}
                {user !== undefined && user.lastName}
              </Nav>
              <Button onClick={logout} variant="outline-warning" size="sm">
                LogOut
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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
    logout: () => dispatch(doLogout()),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(Home);
