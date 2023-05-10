//Describe: Model for status
import connection from "../config/db.js";
import Sequelize from "sequelize";
import Orders from "./orders.js";

const Status = connection.define("status", {
    idstatus: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(45),
        allowNull: false
    }
});


export default Status;

Status.hasMany(Orders, {
    foreignKey: 'idstatus', sourceKey: 'idstatus'
});

Orders.belongsTo(Status, {
    foreignKey: 'idstatus', targetKey: 'idstatus'
});