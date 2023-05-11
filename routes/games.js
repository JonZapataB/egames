import { Router } from "express";
import gameController from "../controller/gameController.js";

const router = Router();

router.get("/", (req, res) => {
  //res.send("Muestra todos los juegos");
  gameController.getAll(req, res);
});

router.get("/:id", (req, res) => {
  gameController.getById(req, res);
  //res.send("Mostrar un juego con id " + req.params.id);
});

router.post(
  "/",
  /*  isAuthorized, */ (req, res) => {
    //gameController.create(req, res);
    res.send("Crea un juego");
  }
);

router.put(
  "/:id",
  /* isAuthorized, */ (req, res) => {
    //gameController.update(req, res);
    res.send("Edita un juego con id " + req.params.id);
  }
);

router.delete(
  "/:id",
  /* isAuthorized, */ (req, res) => {
    //gameController.deletes(req, res);
    res.send("Elimina un equipo con id " + req.params.id);
  }
);

export default router;
