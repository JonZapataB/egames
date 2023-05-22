import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./GamesDescripption.scss";

const GameDescription = ({ game, show, handleClose }) => {
  const navigate = useNavigate();
  const [addedToCart, setAddedToCart] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = async (platform) => {
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
      const response = await axios.post(
        "http://localhost:3011/api/orders/user/add",
        { idgame, quantity, platform },
        {
          headers: { "x-access-token": token },
        }
      );
      setAddedToCart(true);
      setShowMessage(true);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401 || error.response.status === 400) {
        sessionStorage.setItem("gameToBeBought", JSON.stringify(game));
        navigate("/login");
      }
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <div>
        <Modal show={game != null} onHide={handleClose} key={game.idgame}>
          <Modal.Header closeButton>
            <Modal.Title>{game.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <article>
              <img
                className="descriptionImg"
                src={game.cover}
                alt={game.name}
              />
              <p>{game.description}</p>
              <p>{game.release_date}</p>
              <div>
                {game.stocks.map((element) => (
                  <div>
                    <p>{element.platform}</p>
                    <p>{element.price / 100}€</p>
                    {element.stock === 0 ? (
                      <button className="botonAñadir" disabled>
                        No quedan unidades
                      </button>
                    ) : (
                      <button
                        className="botonAñadir"
                        onClick={() => handleAddToCart(element.platform)}
                      >
                        Añadir al carrito
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </article>
          </Modal.Body>
          <Modal.Footer>
            {showMessage && <p>Juego añadido</p>}
            <button
              className="botonCerrar"
              variant="secondary"
              onClick={handleClose}
            >
              Cerrar
            </button>
            {showMessage && (
              //si el juego se ha añadido al carrito, se muestra el botón de ir al carrito y te lleva a la ruta /orders
              <button
                className="botonIr"
                onClick={() => {
                  navigate("/orders");
                }}
              >
                Ir al Pedido
              </button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default GameDescription;
