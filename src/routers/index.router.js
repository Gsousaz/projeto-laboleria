import { Router } from "express";
import cakesRouter from "./cakes.router.js";

const router = Router();
router.use(cakesRouter)

export default router;
