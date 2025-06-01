import { Router } from "express";
import { createExpediente, updateExpediente, deleteExpediente, getExpedienteInList } from "../controllers/expediente.controller";

const router = Router();

router.post("/", createExpediente);
router.put("/:CI", updateExpediente);
router.delete("/:CI", deleteExpediente);
router.get("/:page/:pageSize", getExpedienteInList);

export default router;
