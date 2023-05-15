import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "../middlewares/google.js";
import User from "../models/users.js";

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
  (req, res) => {
    const token = jwt.sign(
      {
        name: req.user.displayName,
        id: req.user.id,
      },
      process.env.TOKEN_SECRET
    );
    res.cookie("access_token", token).send(req.user);
  }
);

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ where: { email: email } });
  res.send(user);
  return;

  const token = jwt.sign(
    {
      name: req.user.displayName,
      id: req.user.id,
    },
    process.env.TOKEN_SECRET
  );
  res.cookie("access_token", token).send(req.user);
});

authRouter.get("/logout", (req, res) => {
  res.clearCookie("access_token").send("LOGOUUUTTTT");
});

export default authRouter;
