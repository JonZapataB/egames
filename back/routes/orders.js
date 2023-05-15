import { Router } from "express";
import orderController from "../controller/orderController.js";

const router = Router();

router.get("/", (req, res) => {
    orderController.getAll(req, res);
});

router.get("/:id", (req, res) => {
    orderController.getById(req, res);
});

router.post("/", (req, res) => {
    orderController.createOrder(req, res);
});

router.post("/add/:idorder",(req, res) => {
    orderController.addGame(req, res);
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