import React from "react";
import { Alert } from "react-bootstrap";

function AlertError({ message }) {
  return (
    <Alert
      className="mt-3 mb-3"
      style={{ width: `70vw`, margin: "auto", textAlign: "center" }}
      variant="danger"
    >
      {message}
    </Alert>
  );
}

export default AlertError;
