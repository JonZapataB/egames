import { Model } from "sequelize";
import Game from "../models/games.js";
import Stock from "../models/stock.js";

const getAll = async (req, res) => {
  try {
    let games = await Game.findAll({
      attributes: ["idgame", "name", "description", "release_date", "cover"],
      include: [
        {
          model: Stock,
          attributes: ["stock", "platform", "price", "idgame"],
        },
      ],
    });
    res.send(games);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving games.",
    });
  }
};

const getById = async (req, res) => {
  try {
    let id = req.params.id;
    let game = await Game.findByPk(id, {
      attributes: ["idgame", "name", "description", "release_date", "cover"],
      include: [
        {
          model: Stock,
          attributes: ["stock", "platform", "price", "idgame"],
        },
      ],
    });
    if (!game) {
      res.status(404).send({
        message: `Cannot find games with id=${id}.`,
      });
    } else {
      res.send(game);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving games.",
    });
  }
};

export default {
  getAll,
  getById,
};
