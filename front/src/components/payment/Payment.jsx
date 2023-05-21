import React, { useEffect, useState } from "react";
import Shipping from "../shipping/Shipping";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import NavBar from "../navBar/NavBar";

const Payment = () => {
  const [paymentMethodName, setPaymentMethodName] = useState("");
  const navigate = useNavigate();
  const pedidoInfo = localStorage.getItem("pedidoInfo");
  const infoPedidoJson = JSON.parse(pedidoInfo);

  useEffect(() => {
    if (!infoPedidoJson) {
      navigate("/orders");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };

  return (
    <div>
      <NavBar></NavBar>
      <Shipping step1 step2 step3></Shipping>
      <h1>Pago</h1>
      <div className="conainer small-conainer">
        <h1>Método de pago</h1>
        <Form onSubmit={submitHandler}>
          <div>
            <Form.Check
              type="radio"
              label="PayPal"
              id="PayPal"
              value="PayPal"
              checked={paymentMethodName === "PayPal"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div>
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              value="Stripe"
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Continuar</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Payment;
