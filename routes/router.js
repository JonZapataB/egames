import { Router } from "express";
import gamesRouter from "./games.js";
import userRouter from "./users.js";
import orderRouter from "./orders.js";

const router = Router();

router.use("/games", gamesRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);

export default router;
