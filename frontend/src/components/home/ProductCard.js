import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { deleteProd } from "../../redux/home/homeReducer";

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

  const deleteProduct = props.deleteProduct;

  const { error, data } = props.reqState;

  useEffect(() => {
    console.log(data);
  });

  const deleteProductAction = (e) => {
    deleteProduct(id);
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
            <Button variant="success">Update</Button>
            <Button
              onClick={deleteProductAction}
              className="ml-3"
              variant="danger"
            >
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

const mapStateToProps = (state) => {
  return {
    reqState: state.homeReducer.data,
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    deleteProduct: (id) => dispatch(deleteProd(id)),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(ProductCard);
