//mostrar control de ordenes
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import "./orders.scss";

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
      console.log("LOS DATOS: ", response);
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

  const getTotal = (order) => {
    let total = 0;
    order.games.forEach((game) => {
      total += game.price * game.quantity;
    });
    return total;
  };

  if (data.length > 0)
    return (
      <div>
        <NavBar></NavBar>
        <h1 className="pedidos">Pedidos</h1>
        <div className="total">
          {data.map((order) => (
            <article className="pedidos" key={order.idorder}>
              <h2 className="idTittle tittle">IdOrder</h2>
              <p className="idOrder">{order.idorder}</p>
              <h2 className="statusTittle tittle">Estado del pedido</h2>
              <p className="status">{order.status.name}</p>
              {order.stocks.map((stocks) => (
                <div key={stocks.idgame}>
                  <h3 className="gameTittle tittle">Game</h3>
                  <img
                    className="imgGame"
                    src={stocks.stock.game.cover}
                    alt={stocks.stock.game.cover}
                  />
                  <p className="game">{stocks.stock.game.name}</p>
                  <h3 className="platformTittle tittle">Platform</h3>
                  <p className="platform">{stocks.stock.platform}</p>
                  <h3 className="priceTittle tittle">Price</h3>
                  <p className="price">{stocks.stock.price / 100}€</p>
                  <h3 className="quantityTittle tittle">Quantity</h3>
                  <p className="quantity">
                    <button
                      onClick={() =>
                        handleAddToCart(
                          stocks.stock.game,
                          stocks.stock.platform,
                          true
                        )
                      }
                    >
                      -
                    </button>
                    {stocks.quantity}
                    <button
                      onClick={() =>
                        handleAddToCart(
                          stocks.stock.game,
                          stocks.stock.platform
                        )
                      }
                    >
                      +
                    </button>
                  </p>
                </div>
              ))}
            </article>
          ))}
        </div>
      </div>
    );
  else return <div>loading...</div>;
};

export default Orders;
