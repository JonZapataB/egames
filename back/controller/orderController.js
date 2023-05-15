import Order from "../models/orders.js";
import Orders_has_stock from "../models/orders_has_stock.js";
import Games from "../models/games.js";
import Stock from "../models/stock.js";


const getAll = async (req,res) => {
    try {
            const orders = await Order.findAll({
                attributes: ["idorder", "iduser","idstatus", ],
                include: [
                    {model:Orders_has_stock,
                    attributes: ["quantity", "idgame"], 
                    include: [
                        {model: Stock,
                        attributes: ["price","platform" ],
                        include: [
                            {model: Games,
                            attributes: ["name",],
                        }
                        ] 
                        },
                    ], 
                }
                    ]
            });
            res.send(orders);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error ocurred while retrieving stock.",
        });
    }
}; 

const getByUserId = async (req,res) => {
    try {
        const order = await Order.findAll({
            where: {
                iduser:user
            },
            attributes: ["idorder", "iduser","idstatus",  ],
        });
        res.send(order);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error ocurred while retrieving stock.",
        });
    }
};

const pendienteByUserId = async (req,res) => {
    try {
        const order = await Order.findOne({
            where: {
                iduser: Usuario,
                idstatus: 1,
            },
            attributes: ["idorder", "iduser","idstatus", ],
        });
        res.send(order);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error ocurred while retrieving stock.",
        });
    }
};

const getById = async (req,res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id,{ 
            attributes: ["idorder", "iduser","idstatus", ],
            include: [
                {model:Orders_has_stock,
                attributes: ["quantity", "idgame"], 
                include: [
                    {model: Stock,
                    attributes: ["price","platform" ],
                     include: [
                        {model: Games,
                        attributes: ["name",],
                    }
                    ] 
                    },
                ], 
            }
                ]
        });
        res.send(order);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error ocurred while retrieving stock.",
        });
    }
};  


    
const createOrder = async (req,res) => {
    try {
        console.log(req.body    )
        const { iduser,idstatus } = req.body;
        let order = await Order.create({
            iduser: iduser,
            idstatus: idstatus,
        });
        res.send(order);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error ocurred while retrieving stock.",
        });
    }
};
    
 

const addGame = async (req,res) => {
    try {
        const { idgame, cantidad } = req.body;
        let order = await pendienteByUserId(Usuario);
        if (order[0] == 1) {
            return order;
        }
        order = order[1];
        if (!order) {
            order = await createOrder(Usuario);
            order = order[1];
        }
        let gameExist = await Orders_has_stock.findOne({
            where: {
                idorder: order.idorder,
                idgame: idgame
            }
        });
        if (gameExist) {
            gameExist.cantidad += cantidad;
            await gameExist.save();
        } else {
            await Orders_has_stock.create({
                idorder: order.idorder,
                idgame: idgame,
                cantidad: cantidad
            });
        }       
        res.send(order);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error ocurred while retrieving stock.",
        });
    }
};
  

const updateOrder = async (req,res) => {
    try {
        const { idorder } = req.params;
        let order = await Order.update(data, {
            where: {
                idorder: idorder
            }
        });
        res.send(order);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error ocurred while retrieving stock.",
        });
    }
};

const deleteGame = async (req,res) => {
    try {
        const { idorder } = req.params;
        let order = await Order.destroy({
            where: {
                idorder: idorder
            }
        });
        res.send(order);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error ocurred while retrieving stock.",
        });
    }
};

const changeOrderStatus= async (idorder,idstatus) => {
    try {
        let order = await Order.update({
            idstatus: idstatus 
        }, {
            where: {
                idorder: idorder
            }
        });
        return [null, order];
    } catch (error) {
        return [error, null];
    }
}

const cancelOrder = async (req,res) => {
    const { idorder } = req.params;
    let [error,order] = await changeOrderStatus(idorder, 5);
    if (error) {
        return res.status(500).send({
            message: error.message || "Some error ocurred while retrieving stock.",
        });
    }
    res.send(order);
}

const confirmOrder = async (req,res) => {
    const { idorder } = req.params;
    let [error,order] = await changeOrderStatus(idorder, 2);
    if (error) {
        return res.status(500).send({
            message: error.message || "Some error ocurred while retrieving stock.",
        });
    }
    res.send(order);
}

const sendOrder = async (req,res) => {
    const { idorder } = req.params;
    let [error,order] = await changeOrderStatus(idorder, 3);
    if (error) {
        return res.status(500).send({
            message: error.message || "Some error ocurred while retrieving stock.",
        });
    }
    res.send(order);
}

const receiveOrder = async (req,res) => {
    const { idorder } = req.params;
    let [error,order] = await changeOrderStatus(idorder, 4);
    if (error) {
        return res.status(500).send({
            message: error.message || "Some error ocurred while retrieving stock.",
        });
    }
    res.send(order);
}

//funcion para quitar el stock de los juegos que se compraron
const removeStock = async (idorder) => {
    try {
        let order = await Orders_has_stock.findAll({ //busco todos los juegos que estan en la orden
            where: {  //donde el id de la orden sea el que me pasan
                idorder: idorder  
            }
        });
        for (let i = 0; i < order.length; i++) { //recorro todos los juegos
            let stock = await Stock.findOne({
                where: {
                    idgame: order[i].idgame
                }
            });
            stock.stock -= order[i].stock;  //le resto el stock que se compro
            await stock.save();
        }
        return [null, order];
    } catch (error) {
        return [error, null];
    }
}


export default {
    getAll,
    createOrder,
    getById,
    addGame,
    updateOrder,
    deleteGame,
    getByUserId,
    pendienteByUserId,
    cancelOrder,
    confirmOrder,
    sendOrder,
    receiveOrder,
    removeStock
}