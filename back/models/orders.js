// Desc: Modelo de la tabla orders
import connection from '../config/db.js';
import Sequelize from 'sequelize';
const Order = connection.define('orders', {
    idorder: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    iduser: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idstatus: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

export default Order; 