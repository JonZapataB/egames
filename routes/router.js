import { Router } from "express";
import gamesRouter from "./games.js";

const router = Router();

router.use("/games", gamesRouter);

export default router;
