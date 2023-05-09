//Describe: Model for status
import connection from "../config/db.js";
import Sequelize from "sequelize";

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