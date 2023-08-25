import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
  createOrder,
  getAllOrders,
  getOrderById,
} from "../controllers/orders.controller.js";
import { orderSchema } from "../schemas/order.Schema.js";

const ordersRouter = Router();

ordersRouter.post("/order", validateSchema(orderSchema), createOrder);
ordersRouter.get("/orders", getAllOrders);
ordersRouter.get("/orders/:id", getOrderById);

export default ordersRouter;
