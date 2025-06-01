import { Router } from "express";
import { createExpediente, updateExpediente, deleteExpediente, getExpedienteInList } from "../controllers/expediente.controller";

const ExpedienteRouter = Router();

ExpedienteRouter.post("/", createExpediente);
ExpedienteRouter.put("/:CI", updateExpediente);
ExpedienteRouter.delete("/:CI", deleteExpediente);
ExpedienteRouter.get("/:page/:pageSize", getExpedienteInList);

export default ExpedienteRouter;
