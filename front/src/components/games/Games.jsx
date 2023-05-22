import React, { useEffect, useState } from "react";
import Axios from "axios";
import DatesGameCarousel from "./DatesGameCarousel";
import GameDescription from "./GameDescription";
import "./Games.scss";
import { HiOutlineArrowUpCircle } from "react-icons/hi2";

const Games = ({ refTo }) => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [platform, setPlatform] = useState("All");
  const [sorting, setSorting] = useState("Alphabetical");
  const [game, setGame] = useState(null);
  const [searchWord, setSearchWord] = useState("");

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
  };

  const handleClose = () => {
    setGame(null);
  };

  useEffect(() => {
    if (searchWord.length < 3 && searchWord !== "") {
      return;
    }
    const searchedGames = games.filter((game) => {
      return game.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    setGames(searchedGames);
  }, [searchWord]);

  const getData = async () => {
    const response = await Axios.get("http://localhost:3011/api/games");
    console.log(response);
    setGames(response.data);
  };

  const sortByReleaseDate = (games) => {
    const newGames = [...games];
    return newGames.sort((a, b) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      return dateB - dateA;
    });
  };

  const goToTop = () => {
    refTo.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let filteredGamesResult = [...games];
    if (platform !== "All") {
      filteredGamesResult = filteredGamesResult.filter((game) => {
        let found = false;
        game.stocks.forEach((stock) => {
          if (stock.platform === platform) found = true;
        });

        return found;
      });
    }

    filteredGamesResult.sort((a, b) => {
      if (sorting === "PriceAsc") return a.stocks[0].price - b.stocks[0].price;
      else if (sorting === "PriceDesc")
        return b.stocks[0].price - a.stocks[0].price;
      else if (sorting === "ReleaseDate")
        return new Date(a.release_date) - new Date(b.release_date);
      else return a.name.toUpperCase() - b.name.toUpperCase();
    });

    setFilteredGames(filteredGamesResult);
  }, [games, platform, sorting]);

  if (games.length > 0)
    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            className="searcher"
          />
        </div>
        <div>
          <h2 className="novedadesTittle" id="novedades">
            Novedades
          </h2>
          <DatesGameCarousel
            data={sortByReleaseDate(games)}
            handleSelect={handleSelect}
          />
          <h2 className="juegosTittle" id="videojuegos">
            Videojuegos
          </h2>
          <nav className="filterGames">
            <button className="all" onClick={() => setPlatform("All")}>
              All
            </button>
            <button
              className="nintendo"
              onClick={() => setPlatform("Nintendo Switch")}
            >
              Nintendo Switch
            </button>
            <button
              className="ps4"
              onClick={() => setPlatform("Play Station 4")}
            >
              Play Station 4
            </button>
            <button
              className="ps5"
              onClick={() => setPlatform("Play Station 5")}
            >
              Play Station 5
            </button>
            <button className="xOne" onClick={() => setPlatform("Xbox One")}>
              Xbox One
            </button>

            <button
              className="xSeries"
              onClick={() => setPlatform("Xbox Series X")}
            >
              Xbox Series X
            </button>
          </nav>
          <select
            className="filtros"
            onChange={(e) => setSorting(e.target.value)}
          >
            <option value="Alphabetical">Alphabetical</option>
            <option value="PriceAsc">Price Ascending</option>
            <option value="PriceDesc">Price Descending</option>
            <option value="ReleaseDate">Release Date</option>
          </select>
          <div className="boxGames">
            {filteredGames.map((game) => (
              <article key={game.idgame} onClick={() => handleSelect(game)}>
                <div className="juegos">
                  <img src={game.cover} alt={game.name} />
                  <h2>{game.name}</h2>
                  <small className="precio">
                    {game.stocks[0].price / 100}€
                  </small>
                </div>
              </article>
            ))}
            {game != null && (
              <GameDescription game={game} handleClose={handleClose} />
            )}
          </div>
          <HiOutlineArrowUpCircle className="botonSubir" onClick={goToTop} />
        </div>
      </div>
    );
  else return <div>Cargando</div>;
};

export default Games;
