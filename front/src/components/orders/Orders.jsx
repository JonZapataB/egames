//mostrar control de ordenes
import React, {useEffect,useState} from "react";
import Axios from "axios";

const Orders = () => {
    const [data, setData] = useState([]);

    const getData = async () => {
        const response = await Axios.get("http://localhost:3011/api/orders");
        console.log(response);
        setData(response.data);
    };

    useEffect(() => {
        getData();
    }
    , []);

    if (data.length > 0) return ( 
        <di>
            {data.map((order) => (
                <article key={order.idorder}>
                    <h1>{order.idorder}</h1>
                    <p>{order.iduser}</p>
                    <p>{order.idstatus}</p>
                </article>
            ))}
        </di>);
    else return <div>loading...</div>;
};

export default Orders