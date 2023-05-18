import React, { useEffect, useState } from "react";
import Axios from "axios";
import DatesGameCarousel from "./DatesGameCarousel";
import GamesByPlatform from "./GamesByPlatform";
import GameDescription from "./GameDescription";
import "./Games.scss";
const Games = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [game, setGame] = useState(null);

  const handleSelect = (game) => {
    console.log(game);
    setGame(game);
    handleShow();
  };

  const handleClose = () => {
    setGame(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const getData = async () => {
    const response = await Axios.get("http://localhost:3011/api/games");
    console.log(response);
    setData(response.data);
  };

  const sortByReleaseDate = (games) => {
    const newGames = [...games];
    return newGames.sort((a, b) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      return dateB - dateA;
    });
  };

  const sortByName = (games) => {
    const newGames = [...games];
    return newGames.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      else if (nameA > nameB) return 1;
      else return 0;
    });
  };

  const sortByPrice = (games) => {
    const newGames = [...games];
    return newGames.sort((a, b) => {
      const priceA = a.stocks[0].price;
      const priceB = b.stocks[0].price;
      return priceA - priceB;
    });
  };

  const sortByPlatform = (games) => {
    const newGames = [...games];
    return newGames.sort((a, b) => {
      const platformA = a.stocks[0].platform.toUpperCase();
      const platformB = b.stocks[0].platform.toUpperCase();
      if (platformA < platformB) return -1;
      else if (platformA > platformB) return 1;
      else return 0;
    });
  };

  useEffect(() => {
    getData();
  }, []);
  if (data.length > 0)
    return (
      <div>
        <div>
          <DatesGameCarousel data={sortByReleaseDate(data)} />

          {sortByName(data).map((game) => (
            <article key={game.idgame}>
              <h2>{game.name}</h2>
              <img
                src={game.cover}
                alt={game.name}
                onClick={() => handleSelect(game)}
              />
            </article>
          ))}
          {show && (
            <GameDescription
              game={game}
              show={show}
              handleClose={handleClose}
            />
          )}
          <GamesByPlatform data={sortByPlatform(data)} />
        </div>
      </div>
    );
  else return <div>Cargando</div>;
};

export default Games;
