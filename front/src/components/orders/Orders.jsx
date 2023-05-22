//mostrar control de ordenes
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import Footer from "../Footer/Footer";
import "./orders.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

const Orders = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const infoUser = localStorage.getItem("infoUser");
      console.log("infoUser", infoUser);
      if (!infoUser) {
        navigate("/login");
        return;
      }
      const token = JSON.parse(infoUser).token;
      const response = await axios.get(
        "http://localhost:3011/api/orders/user/history",
        { headers: { "x-access-token": token } }
      );
      console.log("LOS DATOS de orders: ", response);
      setData(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401 || error.response.status === 400) {
        navigate("/login");
      }
    }
  };

  const handleAddToCart = async (game, platform, subtract = false) => {
    try {
      const idgame = game.idgame;
      const quantity = 1;
      const infoUser = localStorage.getItem("infoUser");
      console.log("infoUser", infoUser);
      if (!infoUser) {
        console.log("no hay infoUser");
        sessionStorage.setItem("gameToBeBought", JSON.stringify(game));
        navigate("/login");
        return;
      }
      const token = JSON.parse(infoUser).token;
      const route = subtract ? "subtract" : "add";
      const response = await axios.post(
        `http://localhost:3011/api/orders/user/${route}`,
        { idgame, quantity, platform },
        {
          headers: { "x-access-token": token },
        }
      );
      console.log(response);
      getData();
    } catch (error) {
      console.log(error);
      if (error.response.status === 401 || error.response.status === 400) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDeleteOrder = async (idorder, game, platform) => {
    try {
      const idgame = game.idgame;
      const infoUser = localStorage.getItem("infoUser");
      console.log("infoUser", infoUser);
      if (!infoUser) {
        console.log("no hay infoUser");
        sessionStorage.setItem("gameToBeBought", JSON.stringify(game));
        navigate("/login");
        return;
      }
      const token = JSON.parse(infoUser).token;
      const response = await axios.delete(
        `http://localhost:3011/api/orders/user/delete/${idorder}`,
        { idgame, platform },
        {
          headers: { "x-access-token": token },
        }
      );
      console.log("LA RESPUESTA", response);
      getData();
    } catch (error) {
      console.log("El error de borrar", error);
      if (error.response.status === 401 || error.response.status === 400) {
        console.log("error", error.response.status);
        navigate("/login");
      }
    }
  };

  const getTotal = (order) => {
    let total = 0;
    order.stocks.forEach((stock) => {
      total += stock.stock.price * stock.quantity;
    });
    return total;
  };

  const checkOutHandler = () => {
    if (data[0].user.userInfo === null) {
      navigate("/profile");
      return;
    }
    console.log("A VER ESTO QUé me da", data);

    localStorage.setItem("pedidoInfo", JSON.stringify(data));

    navigate("/payment");
  };

  if (data.length > 0)
    return (
      <div className="orderGeneral">
        <NavBar></NavBar>
        <h2 className="tuCarrito">Tu carrito: </h2>
        <br />
        <div className="total">
          <Row>
            <Col md={8}>
              {data[0].stocks.length === 0 ? (
                <h3>
                  No tienes pedidos. <Link to="/">Ir a la tienda</Link>
                </h3>
              ) : (
                <ListGroup variant="flush">
                  {data[0].stocks.map((order) => (
                    <ListGroup.Item key={order.idgame}>
                      <Row>
                        <Col md={4}>
                          <h3>
                            <strong>Nombre: </strong>
                            {order.stock.game.name}
                          </h3>
                          <img
                            className="imgOrders"
                            src={order.stock.game.cover}
                            alt=""
                          />{" "}
                        </Col>
                        <Col>
                          <h2>
                            <strong>Plataforma: </strong>
                            {order.stock.platform}
                          </h2>
                        </Col>
                        <Col className="precioOrders" md={3}>
                          <h2>
                            <strong>Precio: </strong>
                            {order.stock.price / 100}€
                          </h2>
                        </Col>
                        <div>
                          <Col md={3}>
                            <button
                              className="botonmenos"
                              /*                             disabled={order.quantity === 1}
                               */ onClick={() =>
                                handleAddToCart(
                                  order.stock.game,
                                  order.stock.platform,
                                  true
                                )
                              }
                            >
                              -
                            </button>
                            {order.quantity}
                            <button
                              className="botonmas"
                              onClick={() =>
                                handleAddToCart(
                                  order.stock.game,
                                  order.stock.platform
                                )
                              }
                            >
                              +
                            </button>
                          </Col>
                        </div>
                        <Col md={2}>
                          <button
                            className="botonEliminar"
                            onClick={() =>
                              handleDeleteOrder(
                                order.idorder,
                                order.stock.game,
                                order.stock.platform
                              )
                            }
                          >
                            Eliminar
                          </button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>
            <Col md={4}></Col>
          </Row>
        </div>
        <div className="totalPrecio">
          <h2 className="totalTittle">Total</h2>
          <p className="totalPrice">{getTotal(data[0]) / 100}€</p>
        </div>
        <button
          className="buy-button"
          /*           disabled={data.length === 0}
           */ onClick={checkOutHandler /* () => navigate("/payment") */}
        >
          Comprar 💲
        </button>
        <Footer />
      </div>
    );
  else
    return (
      <div>
        <NavBar></NavBar>
        <div className="textoGeneral">
          <h1>El carrito está vacío.</h1>
          <h2>Gratis no te vamos a dar nada 😜</h2>
        </div>
        <button className="noOrders" onClick={() => navigate("/")}>
          Ir a la tienda
        </button>
        <Footer />
      </div>
    );
};

export default Orders;
