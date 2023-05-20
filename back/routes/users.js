import { Router } from "express";
import userController from "../controller/userController.js";
import verifyToken from "../middlewares/jwt.js";

const router = Router();
// ruta para el login
router.post("/login", verifyToken, (req, res) => {
  userController.login(req, res);
});
// ruta para el registro
router.post("/register", (req, res) => {
  userController.create(req, res);
});
// ruta para la info del usuario
router.post("/info", verifyToken, (req, res) => {
  userController.createUserInfo(req, res);
});
// ruta para obtener todos los usuarios
router.get("/", (req, res) => {
  userController.getAll(req, res);
});
// ruta para obtener un usuario por id
router.get("/:id", verifyToken, (req, res) => {
  userController.getById(req, res);
});
// ruta para editar un usuario
router.put("/edit", verifyToken, (req, res) => {
  userController.updateUser(req, res);
});

export default router;
