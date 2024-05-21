import React from "react";
import { Alert } from "react-bootstrap";
import { ExclamationTriangleFill } from "react-bootstrap-icons";

const ErrorComponent = ({ error, onDismiss }) => {
  if (!error) {
    return null;
  }

  return (
    <Alert variant="danger" className="mt-3" onClose={onDismiss} dismissible>
      <Alert.Heading>
        <ExclamationTriangleFill className="me-2" /> 
        {error.code}
      </Alert.Heading>
      <p>{error.message}</p>
    </Alert>
  );
};

export default ErrorComponent;
