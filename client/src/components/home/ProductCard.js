import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductCard(props) {
  const {
    id,
    firstName,
    lastName,
    email,
    title,
    description,
    price,
    quantity,
  } = props.productInfo;

  const deleteProductAction = props.deleteProductAction;

  const deleteProduct = () => {
    deleteProductAction(id);
  };

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
        {props.type === "myListing" ? (
          <div>
            <hr></hr>
            <Link
              to={{
                pathname: `/update/${id}`,
                state: { prevQuantity: quantity, prevPrice: price },
              }}
            >
              <Button variant="success">Update</Button>
            </Link>
            <Button onClick={deleteProduct} className="ml-3" variant="danger">
              Delete
            </Button>
          </div>
        ) : (
          <></>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
