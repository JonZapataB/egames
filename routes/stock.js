import { Router } from "express";
import stockController from "../controller/stockController.js";

const router = Router();

router.get("/", (req, res) => {
  stockController.getAll(req, res);
});

router.get("/:id", (req, res) => {
  stockController.getById(req, res);
  //res.send("Mostrar un juego con id " + req.params.id);
});

export default router;
