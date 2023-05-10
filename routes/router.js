import { Router } from "express";
import gamesRouter from "./games.js";
import userRouter from "./users.js";

const router = Router();

router.use("/games", gamesRouter);
router.use("/users", userRouter);

export default router;
