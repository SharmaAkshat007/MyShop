import React from "react";
import { Redirect } from "react-router-dom";
import getToken from "../../utils/getToken";

import { Navbar, Form, Nav, FormControl, Button } from "react-bootstrap";

function Home() {
  if (getToken()) {
    return (
      <>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>

          <Button variant="outline-light">Search</Button>
        </Navbar>
      </>
    );
  } else {
    return <Redirect to="/login"></Redirect>;
  }
}

export default Home;
