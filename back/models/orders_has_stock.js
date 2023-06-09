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
        primaryKey: true,
        allowNull: false
    },
    platform: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
    }
},
{
    freezeTableName: true,
    timestamps: false,
});

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

export default OrdersHasStock;


