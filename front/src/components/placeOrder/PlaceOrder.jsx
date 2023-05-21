import React, { useEffect, useReducer } from "react";
import Shipping from "../shipping/Shipping";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../navBar/NavBar";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_ORDER_REQUEST":
      return { ...state, loading: true };
    case "CREATE_ORDER_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_ORDER_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const PlaceOrder = () => {
  const navigate = useNavigate();
  const pedidoInfo = localStorage.getItem("pedidoInfo");
  const infoPedidoJson = JSON.parse(pedidoInfo);

  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
  });

  const paymentMethod = localStorage.getItem("paymentMethod");

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_ORDER_REQUEST" });
      const { data } = await axios.post(
        "api/orders",
        {
          user: infoPedidoJson[0].iduser,
          paymentMethod: paymentMethod,
          items: infoPedidoJson[0].orders_has_stocks,
          total:
            infoPedidoJson[0].orders_has_stocks.reduce(
              (acc, item) => acc + item.stock.price * item.quantity,
              0
            ) / 100,
          shippingAddress: infoPedidoJson[0].user.userInfo.address,
        },
        {
          headers: { "x-access-token": infoPedidoJson[0].user.token },
        }
      );
      dispatch({ type: "CREATE_ORDER_SUCCESS" });
      localStorage.removeItem("pedidoInfo");
      localStorage.removeItem("paymentMethod");

      navigate(`/order/${data.idorder}`);
    } catch (error) {
      dispatch({ type: "CREATE_ORDER_FAIL" });
      console.log("ESTE ES EL ERROR DEL PEDIDO", error);
    }
  };

  useEffect(() => {
    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [paymentMethod, navigate]);

  return (
    <div>
      <NavBar></NavBar>
      <Shipping step1 step2 step3 step4></Shipping>
      <h1>Vista previa del pedido</h1>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Dirección de envío</Card.Title>
              <Card.Text>
                <strong>Nombre: </strong>
                {infoPedidoJson[0].user.userInfo.name},<br />
                <strong>Dirección: </strong>
                {infoPedidoJson[0].user.userInfo.address},{" "}
              </Card.Text>
              <Link to="/profile">Editar</Link>
            </Card.Body>
          </Card>
          <br />
          <Card>
            <Card.Body>
              <Card.Title>Pago</Card.Title>
              <Card.Text>
                <strong>Método de pago: </strong>
                {paymentMethod}
              </Card.Text>
              <Link to="/payment">Editar</Link>
            </Card.Body>
          </Card>
          <br />
          <Card>
            <Card.Body>
              <Card.Title>Artículos</Card.Title>
              <ListGroup variant="flush">
                {infoPedidoJson[0].orders_has_stocks.map((item) => (
                  <ListGroup.Item key={item.idgame}>
                    <Row>
                      <Col md={6}>
                        {
                          <img
                            src={item.stock.game.cover}
                            alt={item.stock.game.name}
                          />
                        }
                      </Col>
                      <Col md={6}>
                        <strong>Nombre: </strong>
                        {item.stock.game.name}
                      </Col>
                      <Col md={6}>
                        <strong>Precio: </strong>
                        {item.stock.price / 100}€
                      </Col>
                      <Col md={6}>
                        <strong>Cantidad: </strong>
                        {item.quantity}
                      </Col>
                    </Row>
                    <Link to="/orders">Editar</Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Resumen del pedido</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Artículos</Col>
                    <Col>
                      {infoPedidoJson[0].orders_has_stocks.reduce(
                        (acc, item) => acc + item.quantity,
                        0
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Precio</Col>
                    <Col>
                      {infoPedidoJson[0].orders_has_stocks.reduce(
                        (acc, item) => acc + item.stock.price * item.quantity,
                        0
                      ) / 100}
                      €
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Envío</Col>
                    <Col>Gratis</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>
                      {infoPedidoJson[0].orders_has_stocks.reduce(
                        (acc, item) => acc + item.stock.price * item.quantity,
                        0
                      ) / 100}
                      €
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <button onClick={placeOrderHandler}>Realizar pedido</button>
                  {loading && <p>Cargando...</p>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrder;
