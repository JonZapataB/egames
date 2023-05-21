import React, { useState } from "react";
import useNavigate from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Shipping = (props) => {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? "active" : ""}>Cuenta</Col>
      <Col className={props.step2 ? "active" : ""}>Dirección</Col>

      <Col className={props.step3 ? "active" : ""}>Pago</Col>

      <Col className={props.step4 ? "active" : ""}>Realizar pedido</Col>
    </Row>
  );
};

export default Shipping;
