import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("Muestra todos los juegos");
  //userController.getAll(req, res);
});

export default router;
