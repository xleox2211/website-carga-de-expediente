import { type Request, type Response } from "express";
import { Expediente, FileModel } from "../models/Expedientes";
import path from "node:path"
import { deleteFile } from "../filesManager";

async function createExpediente(req: Request, res: Response): Promise<void> {
    const expedienteData = req.body;
    const files: Express.Multer.File[] = Array.isArray(req.files) ? req.files : [];

    try {
        const expedienteQuery = await Expediente.create(
            {
                CI: expedienteData.CI,
                nombre: expedienteData.nombre,
                profesor: expedienteData.profesor,
                fechaCreacion: new Date(),
                fechaModificacion: new Date(),
                carrera: expedienteData.carrera
            }
        )

    if (expedienteQuery){
        // Create file entries for each uploaded file
        const fileEntries = files.map(file => ({
            expedienteCI: expedienteData.CI,
            filename: file.filename,
            fileExtension: path.extname(file.originalname),
            fileSize: file.size,
            originalName: file.originalname
        }));

        await FileModel.bulkCreate(fileEntries)
        console.log("Expediente created successfully with files:", fileEntries);
        res.status(201).json({
            message: "Expediente created successfully",
            expediente: expedienteQuery,
            files: fileEntries
        });
    }
    }
    catch (error) {
        console.error("Error creating expediente:", error);
        res.status(500).json({ error: "Failed to create expediente" });
        return;
    }
}

async function updateExpediente(req: Request, res: Response): Promise<void> {
    const expedienteId = req.params.CI;
    console.log(`Updating expediente with ID ${expedienteId}`);
    const expedienteData = req.body;
    const files: Express.Multer.File[] = Array.isArray(req.files) ? req.files : [];

    try {
        const expedienteQuery = await Expediente.update(
            {
                CI: expedienteData.CI,
                nombre: expedienteData.nombre,
                profesor: expedienteData.profesor,
                fechaModificacion: new Date(),
                carrera: expedienteData.carrera
            },
            {
                where: {
                    CI: expedienteId
                }
            }
        );

        if (!expedienteQuery[0]) {
            res.status(404).json({ error: "Expediente not found" });
            return;
        }

        // Delete existing files from the database and filesystem
        const existingFiles = await FileModel.findAll({ where: { expedienteCI: expedienteId } });

        for (const file of existingFiles) {
            await deleteFile(file.getDataValue('filename'));
            await FileModel.destroy({ where: { id: file.getDataValue('id') } });
        }

        // Create new file entries for each uploaded file
        const fileEntries = files.map(file => ({
            expedienteCI: expedienteId,
            filename: file.filename,
            fileExtension: path.extname(file.originalname),
            fileSize: file.size,
            originalName: file.originalname
        }));

        await FileModel.bulkCreate(fileEntries);

        console.log("Expediente updated successfully with files:", fileEntries);
        res.status(200).json({
            message: "Expediente updated successfully",
            expediente: expedienteData,
            files: fileEntries
        });
    }
    catch (error) {
        console.error("Error updating expediente:", error);
        res.status(500).json({ error: "Failed to update expediente" });
        return;
    }
}

async function deleteExpediente(req: Request, res: Response): Promise<void> {
    const expedienteId = req.params.CI;
    console.log(`Deleting expediente with ID ${expedienteId}`);
    
    try {
        const expediente = await Expediente.findByPk(expedienteId);
        if (!expediente) {
            res.status(404).json({ error: "Expediente not found" });
            return;
        }

        // Delete associated files from the database and filesystem
        const existingFiles = await FileModel.findAll({ where: { expedienteCI: expedienteId } });
        for (const file of existingFiles) {
            await deleteFile(file.getDataValue('filename'));
            await FileModel.destroy({ where: { id: file.getDataValue('id') } });
        }

        // Delete the expediente
        await Expediente.destroy({ where: { CI: expedienteId } });

        console.log(`Expediente with ID ${expedienteId} deleted successfully.`);
        res.status(200).json({ message: "Expediente deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting expediente:", error);
        res.status(500).json({ error: "Failed to delete expediente" });
        return;
    }
}

async function getExpedienteInList(req: Request, res: Response): Promise<void> {
    const pageSize = parseInt(req.params.pageSize as string) || 10;
    const page = parseInt(req.params.page as string) || 1;
    console.log(`Getting expediente list with page size ${pageSize} and page ${page}`);

    try {
        const expedientes = await Expediente.findAll({
            limit: pageSize,
            offset: (page - 1) * pageSize
        });
        res.status(200).json(expedientes);
    }
    catch (error) {
        console.error("Error getting expediente list:", error);
        res.status(500).json({ error: "Failed to get expediente list" });
    }
}

async function getAvaibleExpedienteList(req: Request, res: Response): Promise<void> {
    const pageSize = parseInt(req.params.pageSize as string) || 10;

    // devuelve cuantas paginas hay
    const expedienteCount = await Expediente.count();
    const totalPages = Math.ceil(expedienteCount / pageSize);
    res.status(200).json({ totalPages });
}

async function getFilesForExpediente(req: Request, res: Response): Promise<void> {
    const expedienteId = req.params.CI;
    
    console.log(`Getting files for expediente with ID ${expedienteId}`);

    try {
        const files = await FileModel.findAll({
            where: { expedienteCI: expedienteId }   
        });

        if (files.length === 0) {
            res.status(404).json({ error: "No files found for this expediente" });
            return;
        }

        const fileDetails = files.map(file => ({
            id: file.getDataValue('id'),
            expedienteCI: file.getDataValue('expedienteCI'),
            filename: file.getDataValue('filename'),
            fileExtension: file.getDataValue('fileExtension'),
            fileSize: file.getDataValue('fileSize'),
            originalName: file.getDataValue('originalName')
        }));

        res.status(200).json(fileDetails);
    }
    catch (error) {
        console.error("Error getting files for expediente:", error);
        res.status(500).json({ error: "Failed to get files for expediente" });
    }
}

async function getImageForFiles(req: Request, res: Response): Promise<void> {
    const fileId = req.params.id;
    
    console.log(`Getting image for file with ID ${fileId}`);

    try {
        const file = await FileModel.findByPk(fileId);
        if (!file) {
            res.status(404).json({ error: "File not found" });
            return;
        }
        const extensionsAllowed = ['.jpg', '.jpeg', '.png', '.webp'];

        if (!extensionsAllowed.includes(file.getDataValue('fileExtension'))) {
            res.status(400).json({ error: "File type not allowed" });
            return;
        }

        const filePath = path.resolve(__dirname, '../../uploads', file.getDataValue('filename'));
        console.log(`Sending file from path: ${filePath}`);

        res.sendFile(filePath, (err) => {
            if (err) {
                console.error("Error sending file:", err);
                res.status(500).json({ error: "Failed to send image file" });
            }
        });
    }
    catch (error) {
        console.error("Error getting image for file:", error);
        res.status(500).json({ error: "Failed to get image for file" });
    }
}

async function downloadFile(req: Request, res: Response): Promise<void> {
    const fileId = req.params.id;
    
    console.log(`Downloading file with ID ${fileId}`);

    try {
        const file = await FileModel.findByPk(fileId);
        if (!file) {
            res.status(404).json({ error: "File not found" });
            return;
        }

        const filePath = path.join(__dirname, '../../uploads', file.getDataValue('filename'));
        res.download(filePath, (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.status(500).json({ error: "Failed to download file" });
            }
        });
    }
    catch (error) {
        console.error("Error downloading file:", error);
        res.status(500).json({ error: "Failed to download file" });
    }
}

async function deleteFileFromExpediente(req: Request, res: Response): Promise<void> {
    const expedienteCI = req.params.CI;
    const fileId = req.params.fileId;

    console.log(`Deleting file with ID ${fileId} from expediente with CI ${expedienteCI}`);

    try {
        const file = await FileModel.findOne({
            where: {
                expedienteCI: expedienteCI,
                id: fileId
            }
        });

        if (!file) {
            res.status(404).json({ error: "File not found in this expediente" });
            return;
        }

        // Delete the file from the filesystem
        await deleteFile(file.getDataValue('filename'));

        // Delete the file entry from the database
        await FileModel.destroy({ where: { id: fileId } });

        console.log(`File with ID ${fileId} deleted successfully from expediente with CI ${expedienteCI}`);
        res.status(200).json({ message: "File deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting file from expediente:", error);
        res.status(500).json({ error: "Failed to delete file from expediente" });
    }
}

export {
    createExpediente,
    updateExpediente,
    deleteExpediente,
    getExpedienteInList,
    getAvaibleExpedienteList,
    getFilesForExpediente,
    getImageForFiles,
    downloadFile,
    deleteFileFromExpediente
};