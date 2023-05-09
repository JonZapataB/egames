//Describe: Model for orders_has_stock
import connection from "../config/db.js";
import Sequelize from "sequelize";

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
    },
    plataform:{
        type: Sequelize.STRING(45),
        allowNull: false
    }
});

export default OrdersHasStock;
