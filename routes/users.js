import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  //userController.getAll(req, res);
  res.send("Muestra todos los usuarios");
});

router.post("/", (req, res) => {
  res.send("Crea un usuario");
  //.create(req, res);
});

router.post("/login", (req, res) => {
  res.send("Esto te logea");
  //.login(req, res);
});

export default router;
