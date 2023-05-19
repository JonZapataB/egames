import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GameDescription = ({ game, show, handleClose }) => {
  const navigate = useNavigate();

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
      console.log(response);
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
        <Modal show={show} onHide={handleClose} key={game.idgame}>
          <Modal.Header closeButton>
            <Modal.Title>{game.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <article>
              <img src={game.cover} alt={game.name} />
              <p>{game.release_date}</p>
              <p>{game.description}</p>
              <div>
                {game.stocks.map((element) => (
                  <div>
                    <p>{element.platform}</p>
                    <p>{element.price / 100}€</p>
                    <button onClick={() => handleAddToCart(element.platform)}>
                      Añadir al carrito
                    </button>
                  </div>
                ))}
              </div>
            </article>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default GameDescription;
