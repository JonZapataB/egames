import React, { useEffect, useState } from "react";
import Axios from "axios";
import DatesGameCarousel from "./DatesGameCarousel";
import GameDescription from "./GameDescription";
import NavBar from "../navBar/NavBar";
import "./Games.scss";

const Games = () => {
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
          <DatesGameCarousel
            data={sortByReleaseDate(games)}
            handleSelect={handleSelect}
          />
          <nav className="filterGames">
            <button onClick={() => setPlatform("All")}>All</button>
            <button onClick={() => setPlatform("Nintendo Switch")}>
              Nintendo Switch
            </button>
            <button onClick={() => setPlatform("Play Station 4")}>
              Play Station 4
            </button>
            <button onClick={() => setPlatform("Play Station 5")}>
              Play Station 5
            </button>
            <button onClick={() => setPlatform("Xbox One")}>Xbox One</button>

            <button onClick={() => setPlatform("Xbox Series X")}>
              Xbox Series X
            </button>
          </nav>
          <select onChange={(e) => setSorting(e.target.value)}>
            <option value="Alphabetical">Alphabetical</option>
            <option value="PriceAsc">Price Ascending</option>
            <option value="PriceDesc">Price Descending</option>
            <option value="ReleaseDate">Release Date</option>
          </select>
          <div className="boxGames">
            {filteredGames.map((game) => (
              <article key={game.idgame} onClick={() => handleSelect(game)}>
                <div className="juegos">
                  <h2>{game.name}</h2>
                  <img src={game.cover} alt={game.name} />
                  <p>{game.release_date}</p>
                  <small>{game.stocks[0].price / 100}€</small>
                </div>
              </article>
            ))}
            {game != null && (
              <GameDescription game={game} handleClose={handleClose} />
            )}
          </div>
        </div>
      </div>
    );
  else return <div>Cargando</div>;
};

export default Games;
