import { Router } from "express";
import orderController from "../../controller/orderControllerr.js";

const router = Router();

router.get("/orders", (req, res) => {
    orderController.getAll(req, res);
});

router.get("/orders/:id", (req, res) => {
    orderController.getById(req, res);
});

router.post("/orders", (req, res) => {
    orderController.createOrder(req, res);
});

router.get("/orders/add/:gameid",(req, res) => {
    orderController.addGame(req, res);
});

router.get("/orders/delete/:gameid", (req, res) => {
    orderController.deleteGame(req, res);
});

export default router;