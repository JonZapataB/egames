//Desc: Model for stock table
import connection from "../config/db.js";
import Sequelize from "sequelize";

const Stock = connection.define(
  "stock",
  {
    stock: {
      type: Sequelize.INTEGER,
    },
    platform: {
      primaryKey: true,
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    idgame: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Stock;
