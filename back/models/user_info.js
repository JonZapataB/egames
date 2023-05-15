//Describe: Model for user info
import connection from "../config/db.js";
import Sequelize from "sequelize";

const UserInfo = connection.define(
  "userInfo",
  {
    iduser: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    phoneNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default UserInfo;
