import React, { useEffect, useState } from "react";
import axios from "axios";

const GameDescription = ({ data }) => {
  if (data.length > 0) {
    return (
      <div>
        {data.map((game) => (
          <article key={game.idgame}>
            <h2>{game.name}</h2>
            <img src={game.cover} alt={game.name} />
            <p>{game.description}</p>
            <p>{game.price}</p>
            <p>{game.stock}</p>
            <p>{game.platform}</p>
            <p>{game.release_date}</p>
          </article>
        ))}
      </div>
    );
  } else {
    return <div>Cargando</div>;
  }
};

export default GameDescription;
