import { Router } from "express";
import { createExpediente, updateExpediente, deleteExpediente, getExpedienteInList } from "../controllers/expediente.controller";
import upload from "../multer.config";

const ExpedienteRouter = Router();

ExpedienteRouter.post("/", upload.array("files", 5), createExpediente);
ExpedienteRouter.put("/:CI", upload.array("files", 5), updateExpediente);
ExpedienteRouter.delete("/:CI", deleteExpediente);
ExpedienteRouter.get("/:page/:pageSize", getExpedienteInList);

export default ExpedienteRouter;
