import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Games.scss";

//constante que obtenga los juegos por plataforma
const GamesByPlatform = ({ data }) => {
  if (data.length > 0) {
    return (
      <div>
        <div>
          {data.map((game) => (
            <article key={game.idgame}>
              <h2>{game.name}</h2>
              <img src={game.cover} alt={game.name} />
              <div>
                {game.stocks.map((element) => (
                  <div>
                    <p>{element.platform}</p>
                    <p>{element.price / 100}€</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  } else return <div>Cargando</div>;
};

export default GamesByPlatform;
