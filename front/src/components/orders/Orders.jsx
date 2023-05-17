//mostrar control de ordenes
import React, {useEffect,useState} from "react";
import Axios from "axios";

const Orders = () => {
    const [data, setData] = useState([]);

    const getData = async () => {
        const response = await Axios.get('http://localhost:3011/api/orders/user/history',{withCredentials:true});
        console.log(response);
        setData(response.data);
    };

    useEffect(() => {
        getData();
    }
    , []);



    const getTotal = (order) => {
        let total = 0;
        order.products.forEach((product) => {
            total += product.price * product.orderline.quantity;
        });
        return total;
    };


    if (data.length > 0) return ( 
        <di>
            {data.map((order) => (
                <article key={order.idorder}>
                    <h2>Order</h2>
                    <p>{order.idorder}</p>
                    <h1>User</h1>
                    <p>{order.iduser}</p>
                    <h2>Estado del pedido</h2>
                    <p>{order.status.name}</p>
                    {order.stocks.map((stocks) => (
                        <div key={stocks.idgame}>
                            <h3>Game</h3>
                            <p>{stocks.stock.game.name}</p>
                            <h3>Price</h3>
                            <p>{stocks.stock.price}</p>
                            <h3>Quantity</h3>
                            <p>{stocks.quantity}</p>
                        </div>
                    ))}
                </article>
            ))}
        </di>);
    else return <div>loading...</div>;
};

export default Orders