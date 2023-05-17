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
      process.env.TOKEN_SECRET
    );
    res.cookie("access_token", token).redirect("http://localhost:3000");
  }
);

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.status(400).send("Usuario no encontrado");
      return;
    }

    if (user.isGoogle === 1) {
      res
        .status(401)
        .send("Tienes que logearte con tu cuenta de google o crear una nueva.");
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
      process.env.TOKEN_SECRET
    );
    res.cookie("access_token", token).send("Login successfull!");
  } catch (error) {
    res.status(500).send("Error al iniciar sesión");
  }
});

authRouter.get("/logout", (req, res) => {
  res.clearCookie("access_token").send("Logout successfull!");
});

export default authRouter;
