import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "../middlewares/google.js";
import User from "../models/users.js";
import bcrypt from "bcrypt";

const authRouter = Router();

authRouter.get(
  "/google",
  passport.authenticate("auth-google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    session: false,
  }),
  async (req, res) => {
    const email = req.user.emails[0].value;

    let user = await User.findOne({ where: { email: email } });
    if (!user) {
      user = await User.create({
        email: email,
        isGoogle: 1,
      });
    }

    const token = jwt.sign(
      {
        name: user.email,
        id: user.iduser,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "12h" }
    );
    res.redirect(
      `http://localhost:3000/login?token=${token}&id=${user.iduser}`
    );
  }
);

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.status(400).send("Usuario no encontrado");
    }

    if (user.isGoogle === 1) {
      res
        .status(401)
        .send("Tienes que logearte con tu cuenta de google o crear una nueva.");
      return;
    }

    let result = await bcrypt.compare(password, user.password);

    if (!result) {
      res.status(401).send("Contraseña incorrecta");
      return;
    }

    const token = jwt.sign(
      {
        name: user.email,
        id: user.iduser,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "12h" }
    );
    res.send({ email: user.email, token: token, id: user.iduser });
  } catch (error) {
    res.status(500).send("Error al iniciar sesión");
  }
});

authRouter.get("/logout", (req, res) => {
  res.clearCookie("access_token").send("Logout successfull!");
});

export default authRouter;
