import Order from "../models/orders.js";
import Orders_has_stock from "../models/orders_has_stock.js";
import Games from "../models/games.js";
import Stock from "../models/stock.js";

const getAll = async (req, res) => {
  try {
    let orders = await Order.findAll({
      attributes: ["idorder", "iduser", "idstatus"],
    });
    let stocks = orders.map(async (order) => {
      //map devuelve un array con los resultados de la funcion
      return Orders_has_stock.findAll({
        where: {
          idorder: order.idorder,
        },
        attributes: ["quantity", "idgame"],
        include: [
          {
            model: Stock,
            attributes: ["price", "platform"],
            include: [{ model: Games, attributes: ["name"] }],
          },
        ],
      });
    });
    stocks = await Promise.all(stocks); //Promise.all devuelve una promesa que se cumple cuando todas las promesas en el argumento iterable se han cumplido
    orders = orders.map((order, index) => {
      //map devuelve un array con los resultados de la funcion
      return {
        ...order.dataValues,
        stocks: stocks[index],
      };
    });

    res.send(orders);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stock.",
    });
  }
};

const getByUserId = async (req, res) => {
  try {
    const { iduser } = req.user.id;
    let orders = await Order.findAll({
      where: {
        iduser: iduser,
      },
      attributes: ["idorder", "iduser", "idstatus"],
    });
    let stocks = orders.map(async (order) => {
      return Orders_has_stock.findAll({
        where: {
          idorder: order.idorder,
        },
        attributes: ["quantity", "idgame"],
        include: [
          {
            model: Stock,
            attributes: ["price", "platform"],
            include: [{ model: Games, attributes: ["name"] }],
          },
        ],
      });
    });
    stocks = await Promise.all(stocks);
    orders = orders.map((order, index) => {
      return {
        ...order.dataValues,
        stocks: stocks[index],
      };
    });

    res.send(orders);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stock.",
    });
  }
};

const pendienteByUserId = async (iduser) => {
  try {
    const order = await Order.findOne({
      where: {
        iduser: iduser,
        idstatus: 1,
      },
      attributes: ["idorder", "iduser", "idstatus"],
    });
    let stocks = await Orders_has_stock.findAll({
      where: {
        idorder: order.idorder,
      },
      attributes: ["quantity", "idgame"],
      include: [
        {
          model: Stock,
          attributes: ["price", "platform"],
          include: [{ model: Games, attributes: ["name"] }],
        },
      ],
    });
    order.dataValues.stocks = stocks;

    return [null, order];
  } catch (error) {
    return [
      error.message || "Some error ocurred while retrieving stock.",
      null,
    ];
  }
};

const pendienteByUserIdApi = async (req, res) => {
  try {
    const { iduser } = req.params;
    const [error, order] = await pendienteByUserId(iduser);
    if (error) {
      res.status(500).send({
        message: error,
      });
    }
    res.send(order);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stock.",
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      attributes: ["idorder", "iduser", "idstatus"],
      include: [
        {
          model: Orders_has_stock,
          attributes: ["quantity", "idgame"],
          include: [
            {
              model: Stock,
              attributes: ["price", "platform"],
              include: [{ model: Games, attributes: ["name"] }],
            },
          ],
        },
      ],
    });
    res.send(order);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stock.",
    });
  }
};

const createOrder = async (iduser) => {
  try {
    let order = await Order.create({
      iduser: iduser,
      idstatus: 1,
    });
    return [null, order];
  } catch (error) {
    return [
      error.message || "Some error ocurred while retrieving stock.",
      null,
    ];
  }
};

const addGame = async (req, res) => {
  try {
    let { idgame, quantity, platform } = req.body;
    quantity = parseInt(quantity);
    const { iduser } = req.params;
    if (quantity < 1) {
      return res.status(400).send({
        message: "La cantidad debe ser mayor a 0",
      });
    }
    let stock = await Stock.findOne({
      where: {
        idgame: idgame,
        platform: platform,
      },
    });
    if (stock.stock < quantity) {
      return res.status(400).send({
        message: "No hay suficiente stock",
      });
    }
    let order = await pendienteByUserId(iduser);
    if (order[0]) {
      return res.status(500).send({
        message: order[0],
      });
    }
    order = order[1];
    if (!order) {
      order = await createOrder(iduser);
      order = order[1];
    }
    let gameExist = await Orders_has_stock.findOne({
      where: {
        idorder: order.idorder,
        idgame: idgame,
        platform: platform,
      },
    });
    console.log("gameexits", gameExist);
    if (gameExist) {
      gameExist.quantity += quantity;
      await gameExist.save();
    } else {
      await Orders_has_stock.create({
        idorder: order.idorder,
        idgame: idgame,
        quantity: quantity,
        platform: platform,
      });
    }
    stock.stock -= quantity;
    await stock.save();
    order = await pendienteByUserId(iduser);
    res.send(order);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stock.",
    });
  }
};

const subtractGame = async (req, res) => {
  try {
    let { idgame, quantity, platform } = req.body;
    quantity = parseInt(quantity);
    const { iduser } = req.params;
    if (quantity < 1) {
      return res.status(400).send({
        message: "La cantidad debe ser mayor a 0",
      });
    }

    let order = await pendienteByUserId(iduser);
    if (order[0]) {
      return res.status(500).send({
        message: order[0],
      });
    }
    order = order[1];
    if (!order) {
      return res.status(400).send({
        message: "No hay orden pendiente",
      });
    }
    let gameExist = await Orders_has_stock.findOne({
      where: {
        idorder: order.idorder,
        idgame: idgame,
        platform: platform,
      },
    });
    if (!gameExist) {
      return res.status(400).send({
        message: "No hay ese juego en la orden",
      });
    }
    if (gameExist.quantity < quantity) {
      return res.status(400).send({
        message: "No hay suficiente cantidad de ese juego en la orden",
      });
    }
    let stock = await Stock.findOne({
      where: {
        idgame: idgame,
        platform: platform,
      },
    });
    stock.stock += quantity;
    await stock.save();
    gameExist.quantity -= quantity;
    if (gameExist.quantity === 0) {
      await gameExist.destroy();
    } else {
      await gameExist.save();
    }
    order = await pendienteByUserId(iduser);
    res.send(order);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stock.",
    });
  }
};

const deleteGame = async (req, res) => {
  try {
    const { idorder } = req.params;
    let order = await Order.destroy({
      where: {
        idorder: idorder,
      },
    });
    res.send(order);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stock.",
    });
  }
};

const changeOrderStatus = async (idorder, idstatus) => {
  try {
    let order = await Order.update(
      {
        idstatus: idstatus,
      },
      {
        where: {
          idorder: idorder,
        },
      }
    );
    return [null, order];
  } catch (error) {
    return [error, null];
  }
};

const cancelOrder = async (req, res) => {
  const { idorder } = req.params;
  let [error, order] = await changeOrderStatus(idorder, 5);
  if (error) {
    return res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stock.",
    });
  }
  res.send(order);
};

const confirmOrder = async (req, res) => {
  const { idorder } = req.params;
  let [error, order] = await changeOrderStatus(idorder, 2);
  if (error) {
    return res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stock.",
    });
  }
  res.send(order);
};

const sendOrder = async (req, res) => {
  const { idorder } = req.params;
  let [error, order] = await changeOrderStatus(idorder, 3);
  if (error) {
    return res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stock.",
    });
  }
  res.send(order);
};

const receiveOrder = async (req, res) => {
  const { idorder } = req.params;
  let [error, order] = await changeOrderStatus(idorder, 4);
  if (error) {
    return res.status(500).send({
      message: error.message || "Some error ocurred while retrieving stock.",
    });
  }
  res.send(order);
};

export default {
  getAll,
  createOrder,
  getById,
  addGame,
  subtractGame,
  deleteGame,
  getByUserId,
  pendienteByUserIdApi,
  cancelOrder,
  confirmOrder,
  sendOrder,
  receiveOrder,
};
