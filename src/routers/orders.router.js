import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createOrder } from "../controllers/orders.controller.js";
import { orderSchema } from "../schemas/order.Schema.js";

const ordersRouter = Router();

ordersRouter.post("/order", validateSchema(orderSchema), createOrder);

export default ordersRouter;
