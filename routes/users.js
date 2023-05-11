
import { Router } from "express";
import userController from "../controller/userController.js";


const router = Router();

router.get("/login", (req, res) => {
  userController.login(req, res);
});

router.get("/user/register", (req, res) => {
  userController.registerForm(req, res);
});

  router.get("/", (req, res) => {
  userController.getAll(req, res);
});

router.get("/:id", (req, res) => {
  userController.getById(req, res);
});

/*
router.post("/", (req, res) => {
  res.send("Crea un usuario");
  //.create(req, res);
});

router.post("/login", (req, res) => {
  res.send("Esto te logea");
  //.login(req, res);
});*/

export default router; 
