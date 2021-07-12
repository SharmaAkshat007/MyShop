import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { doLogout } from "../../redux/auth/authReducer";

function NavBar(props) {
  const user = props.user;
  const logout = props.logout;

  const history = useHistory();

  const logoutAction = () => {
    logout();
    history.push("/login");
  };
  return (
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
          <Link style={{ color: "white", textDecoration: "none" }} to="/create">
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
        <Nav>
          <Button onClick={logoutAction} variant="outline-warning" size="sm">
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

const mapStateToDispatch = (dispatch) => {
  return {
    logout: () => dispatch(doLogout()),
  };
};

export default connect(null, mapStateToDispatch)(NavBar);
