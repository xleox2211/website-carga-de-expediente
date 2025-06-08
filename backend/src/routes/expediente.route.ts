import { Router } from "express";
import { createExpediente, updateExpediente, deleteExpediente, 
    getExpedienteInList, getAvaibleExpedienteList, downloadFile
    , getFilesForExpediente, getImageForFiles, deleteFileFromExpediente } from "../controllers/expediente.controller";
import upload from "../multer.config";

const ExpedienteRouter = Router();

ExpedienteRouter.post("/", upload.array("files", 5), createExpediente);
ExpedienteRouter.put("/:CI", upload.array("files", 5), updateExpediente);
ExpedienteRouter.delete("/:CI", deleteExpediente);
ExpedienteRouter.get("/expFiles/:CI", getFilesForExpediente);

// Files Routes
ExpedienteRouter.get("/image/:id", getImageForFiles);
ExpedienteRouter.get("/files/:id", downloadFile);
ExpedienteRouter.delete("/files/:CI/:fileId", deleteFileFromExpediente);

ExpedienteRouter.get("/count/:pageSize", getAvaibleExpedienteList);
ExpedienteRouter.get("/:page/:pageSize", getExpedienteInList);



export default ExpedienteRouter;
