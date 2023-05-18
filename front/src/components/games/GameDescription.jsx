import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const GameDescription = ({ game, show, handleClose }) => {
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
              <p>{game.release_date}</p>
              <p>{game.description}</p>
              <div>
                {game.stocks.map((element) => (
                  <div>
                    <p>{element.platform}</p>
                    <p>{element.price / 100}€</p>
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
