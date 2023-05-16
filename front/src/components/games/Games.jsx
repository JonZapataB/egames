import React, {useEffect,useState} from "react";
import Axios from "axios";

const Games = () => {
    const [data, setData] = useState([]);

    const getData = async () => {
        const response = await Axios.get("http://localhost:3011/api/games");
        console.log(response);
        setData(response.data);
    };

    useEffect(() => {
        getData();
    }
    , []);

    if (data.length > 0) return (
        <di>
            {data.map((game) => (
                <article key={game.idgame}>
                    <h1>{game.name}</h1>
                    <p>{game.description}</p>
                    <p>{game.price}</p>
                    <img src={game.cover} alt={game.name} />
                </article>
            ))}
        </di>);
    else return <div>loading...</div>;
};

export default Games;