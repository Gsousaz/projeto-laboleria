import { Router } from "express";
import cakesRouter from "./cakes.router.js";
import clientsRouter from "./clients.router.js";
import ordersRouter from "./orders.router.js";

const router = Router();

router.use(cakesRouter);
router.use(clientsRouter);
router.use(ordersRouter);

export default router;
