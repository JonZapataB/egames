import { Sequelize } from "sequelize";

const sequelize = new Sequelize('egamesSQL', 'root', 'mi-contraseña', {
    host: 'mysql-egames',
    port: 3306,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
  });
  sequelize.authenticate()
  .then(function(err) {
      console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
      console.log('Unable to connect to the database:', err);
});

export default sequelize;