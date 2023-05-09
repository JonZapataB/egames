// Desc: Model for users table
import connection from '../config/db.js';
import Sequelize from 'sequelize';

const User = connection.define('users', {
    iduser: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
});

export default User;