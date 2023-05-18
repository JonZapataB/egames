import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";


const DatesGameCarousel = ({data}) => {
   

    if (data.length > 0) {
      return (
          <div>
            <Carousel>
              {data.map((game) => (
                <Carousel.Item key={game.idgame}>
                  <img src={game.cover} alt={game.name} className="d-block w-100" />
                  <Carousel.Caption className="textoC">
                    <h2>{game.name}</h2>
                    <p>{game.description}</p>
                    <p>{game.release_date}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
      );
    } else {
      return <div>Cargando</div>;
    }
  };
  
  export default DatesGameCarousel;
  