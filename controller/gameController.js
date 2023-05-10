import Game from "../models/games.js";

const getAll = async (req, res) => {
  try {
    let games = await Game.findAll({
      attributes: ["idgame", "name", "description", "release_date", "cover"],
    });
    res.send(games);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving games.",
    });
  }
};

export default {
  getAll,
};
