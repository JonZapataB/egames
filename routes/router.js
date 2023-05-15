import { Router } from "express";
import gamesRouter from "./games.js";
import userRouter from "./users.js";
import stockRouter from "./stock.js";
import orderRouter from "./orders.js";
import authRouter from "./auth.js";

const router = Router();

router.use("/games", gamesRouter);
router.use("/users", userRouter);
router.use("/stock", stockRouter);
router.use("/orders", orderRouter);
router.use("/auth", authRouter);

export default router;
