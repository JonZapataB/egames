import Order from "../models/orders.js";
import Orders_has_stock from "../models/orders_has_stock.js";
import Games from "../models/games.js";


const getAll = async (user) => {
    try {
        if(user.role === "admin"){
            const orders = await Order.findAll({
                attributes: ["idorder", "iduser","idstatus", ],
            });
            return [0, orders];
        }
        else{
            const orders = await Order.findAll({
                where: {
                    iduser: user.iduser
                },
                attributes: ["idorder", "iduser","idstatus", ],
            });
            return [0, orders];
        }

        
    } catch (error) {
        return [1, error];
    }
}; 

const getByUserId = async (user) => {
    try {
        const order = await Order.findAll({
            where: {
                iduser:user
            },
            attributes: ["idorder", "iduser","idstatus",  ],
        });
        return [0, order];
    } catch (error) {
        return [1, error];
    }
};

const pendienteByUserId = async (Usuario) => {
    try {
        const order = await Order.findOne({
            where: {
                iduser: Usuario,
                estado: order.idstatus,
            },
            attributes: ["idorder", "iduser","idstatus", ],
        });
        return [0, order];
    } catch (error) {
        return [1, error];
    }
};

const getById = async (id) => {
    try {
        const order = await Order.findByPk(id,{ 
            attributes: ["idorder", "iduser","idstatus", ],
            include: [
                {model:Orders_has_stock,
                attributes: ["cantidad", "idgame"], 
                include: [
                    {model: Games,
                    attributes: ["nombre", "precio"],}
                ],
            }
                ]
        });
        return [0, order];
    } catch (error) {
        return [1, error];
    }
};  


    
const createOrder = async (Usuario) => {
    try {
        let order = await Order.create({
            iduser: Usuario,
            estado: order.idstatus,
            date: new Date()
        });
        return  [0, order];
    } catch (error) {
        return [1, error];
    }
};
    
 

const addGame = async (Usuario, idgame, cantidad) => {
    try {
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
        }        return [0, order];
    } catch (error) {
        return [1, error];
    }
};
  

const updateOrder = async (data, idorder) => {
    try {
        let order = await Order.update(data, {
            where: {
                idorder: idorder
            }
        });
        return [0, order];
    } catch (error) {
        return [1, error];
    }
};

const deleteGame = async (idorder) => {
    try {
        let order = await Order.destroy({
            where: {
                idorder: idorder
            }
        });
        return [0, order];
    } catch (error) {
        return [1, error];
    }
};


export default {
    getAll,
    createOrder,
    getById,
    addGame,
    updateOrder,
    deleteGame,
    getByUserId,
    pendienteByUserId
}