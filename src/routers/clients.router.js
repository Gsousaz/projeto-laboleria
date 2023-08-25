import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { clientsSchema } from "../schemas/clients.schema.js";
import { createClient } from "../controllers/clients.controller.js";

const clientsRouter = Router();

clientsRouter.post("/clients", validateSchema(clientsSchema), createClient);

export default clientsRouter;
