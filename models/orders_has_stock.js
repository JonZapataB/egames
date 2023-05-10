//Describe: Model for orders_has_stock
import connection from "../config/db.js";
import Sequelize from "sequelize";
import Orders from "./orders.js";
import Stock from "./stock.js";


const OrdersHasStock = connection.define("orders_has_stock", {
    idorder: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idgame: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

export default OrdersHasStock;


OrdersHasStock.belongsTo(Stock, {
    foreignKey: 'idgame', targetKey: 'idgame'
});

OrdersHasStock.belongsTo(Orders, {
    foreignKey: 'idorder', targetKey: 'idorder'
});

Stock.hasMany(OrdersHasStock, {
    foreignKey: 'idgame', sourceKey: 'idgame'
});

Orders.hasMany(OrdersHasStock, {
    foreignKey: 'idorder', sourceKey: 'idorder'
});

