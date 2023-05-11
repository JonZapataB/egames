import Stock from "../models/stock.js";
import Game from "../models/games.js";

const getAll = async (req, res) => {
  try {
    let stock = await Stock.findAll({
      attributes: ["stock", "platform", "price", "idgame"],
      include: [
        {
          model: Game,
          attributes: [
            "idgame",
            "name",
            "release_date",
            "description",
            "cover",
          ],
          as: "game",
        },
      ],
    });
    stock = stock.map((element) => {
      element.stock = parseInt(element.stock);
      return element;
    });
    res.send(stock);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stock.",
    });
  }
};

const getById = async (req, res) => {
  try {
    let id = req.params.id;
    let stock = await Stock.findAll({
      where: { idgame: id },
      attributes: ["idgame", "stock", "platform", "price"],
      include: [
        {
          model: Game,
          attributes: [
            "idgame",
            "name",
            "release_date",
            "description",
            "cover",
          ],
          as: "game",
        },
      ],
    });
    if (!stock) {
      res.status(404).send({
        message: `Cannot find stock with id=${id}.`,
      });
    } else {
      stock = stock.map((element) => {
        element.stock = parseInt(element.stock);
        return element;
      });
      res.send(stock);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stock.",
    });
  }
};

const getByPlatform = async (req, res) => {
  try {
    let platform = req.params.platform;
    let stock = await Stock.findAll({
      where: { platform: platform /* .replace(/\s/g, "") */ },
      attributes: ["idgame", "stock", "platform", "price"],
      /* include: [
          {
            model: Game,
            attributes: [
              "idgame",
              "name",
              "release_date",
              "description",
              "cover",
            ],
            as: "game",
          },
        ], */
    });
    if (!stock) {
      res.status(404).send({
        message: `Cannot find stock with id=${id}.`,
      });
    } else {
      stock = stock.map((element) => {
        element.stock = parseInt(element.stock);
        return element;
      });
      res.send(stock);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stock.",
    });
  }
};

export default {
  getAll,
  getById,
  getByPlatform,
};
