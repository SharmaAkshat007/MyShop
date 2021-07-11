import React from "react";
import { Card } from "react-bootstrap";

function ProductCard({ productInfo }) {
  const { firstName, lastName, email, title, description, price, quantity } =
    productInfo;
  return (
    <Card>
      <Card.Header style={{ backgroundColor: "#ffc107" }}>
        Listed by : {firstName} {lastName} | {email}
      </Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <hr></hr>
        <Card.Text>
          Price : {price} Rs | Quantity : {quantity}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
