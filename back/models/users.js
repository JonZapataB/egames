// Desc: Model for users table
import connection from '../config/db.js';
import Sequelize from 'sequelize';
import UserInfo from './user_info.js';
import Orders from './orders.js';


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
//relaciones entre usuarios y user_info

UserInfo.belongsTo(User, {
     foreignKey: 'iduser', sourceKey: 'iduser'
});
User.hasOne(UserInfo, { 
    foreignKey: 'iduser', sourceKey: 'iduser' 
});

User.hasMany(Orders, {
    foreignKey: 'iduser', sourceKey: 'iduser'
});

Orders.belongsTo(User, {
    foreignKey: 'iduser', targetKey: 'iduser'
});
 