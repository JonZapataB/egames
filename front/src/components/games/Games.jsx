import React, { useEffect, useState } from "react";
import Axios from "axios";
import DatesGameCarousel from "./DatesGameCarousel";
import GamesByPlatform from "./GamesByPlatform";
import GameDescription from "./GameDescription";
import NavBar from "../navBar/NavBar";
import "./Games.scss";

const Games = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [game, setGame] = useState(null);
  const [searchWord, setSearchWord] = useState("");

  /* const handleSearch = (value) => {
    setSearchWord(value);
    console.log("EL VALOR DEL BUSCADOR", value);
    setData(data);
  }; */

  useEffect(() => {
    const gameToBeBought = JSON.parse(sessionStorage.getItem("gameToBeBought"));
    if (gameToBeBought) {
      handleSelect(gameToBeBought);
      sessionStorage.removeItem("gameToBeBought");
    }
  }, []);

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

  useEffect(() => {
    if (searchWord.length < 3 && searchWord !== "") {
      return;
    }
    const filteredGames = data.filter((game) => {
      return game.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    setData(filteredGames);
  }, [searchWord]);

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

  useEffect(() => {
    getData();
  }, []);

  if (data.length > 0)
    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            /* value={searchWord}
            onChange={(e) => handleSearch(e.target.value)} */
            className="searcher"
          />
        </div>
        <div>
          <DatesGameCarousel
            data={sortByReleaseDate(data)}
            handleSelect={handleSelect}
          />
          <div className="boxGames">
            {sortByName(data).map((game) => (
              <article key={game.idgame} onClick={() => handleSelect(game)}>
                <div className="juegos">
                  <h2>{game.name}</h2>
                  <img src={game.cover} alt={game.name} />
                  <p>{game.release_date}</p>
                </div>
              </article>
            ))}
            {show && (
              <GameDescription
                show={show}
                game={game}
                handleClose={handleClose}
              />
            )}
          </div>
          <GamesByPlatform data={data} />
        </div>
      </div>
    );
  else return <div>Cargando</div>;
};

export default Games;
