import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";

const DatesGameCarousel = ({ data, handleSelect }) => {
  if (data.length > 0) {
    return (
      <div>
        <Carousel>
          {data
            .map((game) => (
              <Carousel.Item
                onClick={() => handleSelect(game)}
                key={game.idgame}
              >
                <img
                  src={game.cover}
                  alt={game.name}
                  className="d-block w-100"
                />
                <Carousel.Caption className="textoC">
                  <p>{game.release_date}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))
            .slice(0, 10)}
        </Carousel>
      </div>
    );
  } else {
    return <div>Cargando</div>;
  }
};

export default DatesGameCarousel;
