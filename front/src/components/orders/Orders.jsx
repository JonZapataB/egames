//mostrar control de ordenes
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../navBar/NavBar";

const Orders = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    const infoUser = localStorage.getItem("infoUser");
    console.log("infoUser", infoUser);
    if (!infoUser) {
      navigate("/login");
      return;
    }
    const token = JSON.parse(infoUser).token;
    const response = await Axios.get(
      "http://localhost:3011/api/orders/user/history",
      { headers: { "x-access-token": token } }
    );
    console.log("LOS DATOS: ", response);
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const getTotal = (order) => {
    let total = 0;
    order.products.forEach((product) => {
      total += product.price * product.orderline.quantity;
    });
    return total;
  };

  if (data.length > 0)
    return (
      <di>
        <NavBar></NavBar>
        {data.map((order) => (
          <article key={order.idorder}>
            <h2>Order</h2>
            <p>{order.idorder}</p>
            <h1>User</h1>
            <p>{order.iduser}</p>
            <h2>Estado del pedido</h2>
            <p>{order.status.name}</p>
            {order.stocks.map((stocks) => (
              <div key={stocks.idgame}>
                <h3>Game</h3>
                <img src={stocks.stock.game.cover} alt="imagen del juego: " />
                <p>{stocks.stock.game.name}</p>
                <h3>Platform</h3>
                <p>{stocks.stock.platform}</p>
                <h3>Price</h3>
                <p>{stocks.stock.price / 100}€</p>
                <h3>Quantity</h3>
                <p>{stocks.quantity}</p>
              </div>
            ))}
          </article>
        ))}
      </di>
    );
  else return <div>loading...</div>;
};

export default Orders;
