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

router.get("/add/:orderid",(req, res) => {
    orderController.addGame(req, res);
});

router.get("/delete/:orderid", (req, res) => {
    orderController.deleteGame(req, res);
});

export default router;