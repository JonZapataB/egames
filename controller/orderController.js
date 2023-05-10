import Order from "../../models/orders.js";
import Orders_has_stock from "../../models/¡Orders_has_stock.js";
import Games from "../../models/games.js";


const getAll = async (user) => {
    try {
        if(user.role === "admin"){
            const orders = await Order.findAll({
                attributes: ["idorder", "email_user","date","estado", ],
            });
            return [0, orders];
        }
        else{
            const orders = await Order.findAll({
                where: {
                    email_user: user.email
                },
                attributes: ["idorder", "email_user","date","estado", ],
            });
            return [0, orders];
        }

        
    } catch (error) {
        return [1, error];
    }
}; 

const getByUserEmail = async (email) => {
    try {
        const order = await Order.findAll({
            where: {
                email_user: email
            },
            attributes: ["idorder", "email_user","date","estado", ],
        });
        return [0, order];
    } catch (error) {
        return [1, error];
    }
};

const pendienteByUserEmail = async (email) => {
    try {
        const order = await Order.findOne({
            where: {
                email_user: email,
                estado: "pendiente"
            },
            attributes: ["idorder", "email_user","date","estado" ],
        });
        return [0, order];
    } catch (error) {
        return [1, error];
    }
};

const getById = async (id) => {
    try {
        const order = await Order.findByPk(id,{ 
            attributes: ["idorder", "email_user","date","estado", ],
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


    
const createOrder = async (email) => {
    try {
        let order = await Order.create({
            email_user: email,
            estado: "pendiente",
            date: new Date()
        });
        return  [0, order];
    } catch (error) {
        return [1, error];
    }
};
    
 

const addGame = async (email, idgame, cantidad) => {
    try {
        let order = await pendienteByUserEmail(email);
        if (order[0] == 1) {
            return order;
        }
        order = order[1];
        if (!order) {
            order = await createOrder(email);
            order = order[1];
        }
        let gameExistente = await Orders_has_stock.findOne({
            where: {
                idorder: order.idorder,
                idgame: idgame
            }
        });
        if (gameExistente) {
            gameExistente.cantidad += cantidad;
            await gameExistente.save();
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
    getByUserEmail,
    pendienteByUserEmail
}