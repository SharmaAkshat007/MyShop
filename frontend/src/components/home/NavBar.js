import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar({ user }) {
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
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
