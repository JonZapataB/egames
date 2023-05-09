//Description: Model for the game table
(name, description, release_date, cover)
const Game = connection.define("games", {
    idgame: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    release_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    cover: {
        type: Sequelize.STRING(),
        allowNull: false
    }
});

export default Game;

