import { Router } from "express";
import gamesRouter from "./games.js";
import userRouter from "./users.js";
import stockRouter from "./stock.js";

const router = Router();

router.use("/games", gamesRouter);
router.use("/users", userRouter);
router.use("/stock", stockRouter);

export default router;
