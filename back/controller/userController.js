import User from "../models/users.js";
import UserInfo from "../models/user_info.js";
import bcrypt from "bcrypt";

const getAll = async (req, res) => {
  try {
    let users = await User.findAll({
      attributes: ["iduser", "email", "password"],
      include: [
        {
          model: UserInfo,
          attributes: ["name", "lastname", "address", "phoneNumber"],
        },
      ],
    });
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving users.",
    });
  }
};

const getById = async (req, res) => {
  try {
    const iduser = req.user.id;
    let user = await User.findByPk(iduser, {
      attributes: ["iduser", "email", "password"],
      include: [
        {
          model: UserInfo,
          attributes: ["name", "lastname", "address", "phoneNumber"],
        },
      ],
    });
    res.send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving users.",
    });
  }
};

const login = async (req, res) => {
  const email = req.body.email;
  let user = await User.findOne({ email: email });
  if (!user) {
    res.status(404).send("El usuario no existe");
    return;
  }
  let password = req.body.password;
  /*  if (await bcrypt.compare(password,user.password)) { */ // esta linea es para cuando encriptemos las contraseñas
  if (password == user.password) {
    res.send("Usuario y contraseña correctos");
  } else {
    res.status(401).send("Contraseña incorrecta");
  }
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};

const create = async (req, res) => {
  try {
    const oldUser = await User.findOne({ where: { email: req.body.email } });
    if (oldUser) {
      res.status(400).send("El usuario ya existe");
      return;
    }
    // Verificar si el correo electrónico es válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      res.status(400).send("Por favor, introduce un correo electrónico válido");
      return;
    }
    // Verificar si la contraseña cumple los requisitos
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(req.body.password)) {
      res
        .status(400)
        .send(
          "La contraseña debe contener al menos una letra mayúscula, un número y tener una longitud mínima de 6 caracteres"
        );
      return;
    }

    const password = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      email: req.body.email,
      password: password,
    });

    res.send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Ocurrió un error al obtener los usuarios.",
    });
  }
};

const createUserInfo = async (req, res) => {
  const iduser = req.user.id;

  try {
    const user = await User.findByPk(iduser);
    if (!user) {
      res.status(404).send("El usuario no existe");
      return;
    }
    const userInfo = await UserInfo.create({
      name: req.body.name,
      lastname: req.body.lastname,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      iduser: iduser,
    });

    res.send(userInfo);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving users.",
    });
  }
};

const updateUser = async (req, res) => {
  const iduser = req.user.id;
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      res.status(404).send("El usuario no existe");
      return;
    }
    const userInfo = await UserInfo.update(
      {
        name: req.body.name,
        lastname: req.body.lastname,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
      },
      {
        where: {
          iduser: iduser,
        },
      }
    );
    res.send(userInfo);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving users.",
    });
  }
};

export default {
  create,
  createUserInfo,
  updateUser,
  login,
  getById,
  getAll,
  logout,
};
