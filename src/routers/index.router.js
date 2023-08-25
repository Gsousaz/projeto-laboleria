import { Router } from "express";
import cakesRouter from "./cakes.router.js";
import clientsRouter from "./clients.router.js";

const router = Router();

router.use(cakesRouter);
router.use(clientsRouter);

export default router;
