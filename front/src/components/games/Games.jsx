import React, { useEffect, useState } from "react";
import Axios from "axios";
import DatesGameCarousel from "./DatesGameCarousel";
import "./Games.scss";
const Games = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await Axios.get("http://localhost:3011/api/games");
    console.log(response);
    setData(response.data);
  };

  const sortByReleaseDate = (games) => {
    const newGames = [...games]
    return newGames.sort((a, b) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      return dateB - dateA;
    });
  };

  const sortByName = (games) => {
    const newGames = [...games]
    return newGames.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      else if (nameA > nameB) return 1;
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
                    <img src={game.cover} alt={game.name} />
                    <p>{game.description}</p>
                    <p>{game.release_date}</p>
                </article>
            ))}
        </div>
    </div>
    );
  else return <div>Cargando</div>;
};

export default Games;