import { Router } from "express";
import orderController from "../controller/orderController.js";
import verifyToken from "../middlewares/jwt.js";

const router = Router();

router.get("/", (req, res) => {
  orderController.getAll(req, res);
});

router.get("/user", (req, res) => {
  orderController.pendienteByUserIdApi(req, res);
});

router.get("/user/history",verifyToken, (req, res) => {
  orderController.getByUserId(req, res);
});

router.post("/", (req, res) => {
  orderController.createOrder(req, res);
});

router.post("/user/:iduser/add", (req, res) => {
  orderController.addGame(req, res);
});

router.post("/user/:iduser/subtract", (req, res) => {
  orderController.subtractGame(req, res);
});

router.delete("/delete/:idorder", (req, res) => {
  orderController.deleteGame(req, res);
});

router.post("/cancel/:idorder", (req, res) => {
  orderController.cancelOrder(req, res);
});

router.post("/confirm/:idorder", (req, res) => {
  orderController.confirmOrder(req, res);
});

router.post("/send/:idorder", (req, res) => {
  orderController.sendOrder(req, res);
});

router.post("/receive/:idorder", (req, res) => {
  orderController.receiveOrder(req, res);
});

export default router;
