import { type Request, type Response } from "express";
import { Expediente, Files } from "../models/Expedientes";
import path from "node:path"
import { deleteFile } from "../filesManager";

function expedienteValidation(expediente: Expediente): boolean {
    // Aquí puedes agregar la lógica de validación para el expediente
    if (!expediente.CI || !expediente.nombre || !expediente.profesor || !expediente.carrera) {
        return false;
    }
    return true;
}

function createExpediente(req : Request, res : Response): void {
    const newExpediente: Expediente = req.body;
    console.log('Nuevo expediente recibido:', newExpediente);

    // Validación del expediente
    if (!expedienteValidation(newExpediente)) {
        const response: responseData = {
            status: 400,
            message: 'Datos de expediente inválidos',
            error: 'Invalid expediente data'
        };
        res.status(400).json(response);
        return;
    }

    Expediente.create({
        CI: newExpediente.CI,
        nombre: newExpediente.nombre,
        profesor: newExpediente.profesor,
        carrera: newExpediente.carrera,
        fechaCreacion: newExpediente.fechaCreacion || new Date(),
        fechaModificacion: newExpediente.fechaModificacion || new Date()
    } as any)
        .then((expediente: any) => {
            // Si la creacion del expediente es exitosa, ahora creamos los archivos asociados
            let archivos: any[] = [];
            if (Array.isArray(req.files)) {
                archivos = req.files;
            } else if (req.files && typeof req.files === 'object') {
                archivos = Object.values(req.files).flat();
            }

            if (archivos.length === 0) {
                Expediente.destroy({
                    where: { CI: newExpediente.CI }
                });
                // Si no hay archivos asociados, respondemos con un error
                const response: responseData = {
                    status: 501,
                    message: 'el expediente fue credo sin archivos asociados por lo que no se puede crear el expediente',
                    error: 'No files associated with the expediente',
                    data: newExpediente
                };
                res.status(201).json(response);
                return;
            }

            for (const archivo of archivos) {
                const expedienteFile: ExpedienteFile = {
                    id: 0, // ID se autogenera
                    expedienteCI: newExpediente.CI,
                    fileExtension: path.extname(archivo.originalname).substring(1), // Obtenemos la extensión del archivo
                    filename: archivo.originalname,
                    fileSize: archivo.size,
                };

                Files.create(
                    { ...expedienteFile}                  
                )
                .then(() => {
                    console.log(`Archivo ${archivo.originalname} asociado al expediente ${newExpediente.CI}`);
                })
                .catch((error: { message: any; }) => {
                    console.error(`Error al asociar el archivo ${archivo.originalname} al expediente ${newExpediente.CI}:`, error.message);
                    // Si ocurre un error al crear el archivo, eliminamos el expediente
                    Expediente.destroy({
                        where: { CI: newExpediente.CI }
                    });
                    const response: responseData = {
                        status: 500,
                        message: 'Error al asociar archivos al expediente',
                        error: error.message
                    };
                    res.status(500).json(response);
                });
            }
                    
                

            const response: responseData = {
                status: 201,
                message: 'Expediente creado exitosamente',
                data: expediente
            };
            res.status(201).json(response);
        })
        .catch((error: { message: any; }) => {
            const response: responseData = {
                status: 500,
                message: 'Error al crear el expediente',
                error: error.message
            };
            res.status(500).json(response);
        });
}

function updateExpediente(req: Request, res: Response): void {
    const CI: number = Number(req.params.CI);
    if (!CI) {
        const response: responseData = {
            status: 400,
            message: 'Datos de expediente inválidos',
            error: 'Invalid expediente data'
        };
        res.status(400).json(response);
        return;
    }
    const expedienteData: Expediente = req.body;

    // Validación del expediente
    if (!expedienteValidation(expedienteData)) {
        const response: responseData = {
            status: 400,
            message: 'Datos de expediente inválidos',
            error: 'Invalid expediente data'
        };
        res.status(400).json(response);
        return;
    }

    Expediente.update(expedienteData, {
        where: { CI: CI }
    })
        .then(() => {
            // Eliminamos los archivos asociados al expediente

            Files.findAll({
                where: { expedienteCI: CI }
            })
            .then((files: any[]) => {
                if (files.length > 0) {
                    for (const file of files) {
                        // Eliminamos el archivo del sistema de archivos
                        deleteFile(file.filename)
                            .then(() => {
                                console.log(`Archivo ${file.filename} eliminado exitosamente`);
                            })
                            .catch((error: { message: any; }) => {
                                console.error(`Error al eliminar el archivo ${file.filename}:`, error.message);
                            });
                    }
                }
                // Eliminamos los registros de archivos asociados al expediente
                Files.destroy({
                    where: { expedienteCI: CI }
                });

                // Ahora creamos los nuevos archivos asociados
                let archivos: any[] = [];
                if (Array.isArray(req.files)) {
                    archivos = req.files;
                } else if (req.files && typeof req.files === 'object') {
                    archivos = Object.values(req.files).flat();
                }

                if (archivos.length === 0) {
                    const response: responseData = {
                        status: 501,
                        message: 'El expediente fue actualizado sin archivos asociados',
                        error: 'No files associated with the expediente',
                        data: expedienteData
                    };
                    res.status(201).json(response);
                    return;
                }

                for (const archivo of archivos) {
                    const expedienteFile: ExpedienteFile = {
                        id: 0, // ID se autogenera
                        expedienteCI: CI,
                        fileExtension: path.extname(archivo.originalname).substring(1), // Obtenemos la extensión del archivo
                        filename: archivo.originalname,
                        fileSize: archivo.size,
                    };

                    Files.create(
                        { ...expedienteFile }
                    )
                    .then(() => {
                        console.log(`Archivo ${archivo.originalname} asociado al expediente ${CI}`);
                    })
                    .catch((error: { message: any; }) => {
                        console.error(`Error al asociar el archivo ${archivo.originalname} al expediente ${CI}:`, error.message);
                        const response: responseData = {
                            status: 500,
                            message: 'Error al asociar archivos al expediente',
                            error: error.message
                        };
                        res.status(500).json(response);
                    });
                }
            })

            const response: responseData = {
                status: 200,
                message: 'Expediente actualizado exitosamente'
            };
            res.status(200).json(response);
        })
        .catch((error: { message: any; }) => {
            const response: responseData = {
                status: 500,
                message: 'Error al actualizar el expediente',
                error: error.message
            };
            res.status(500).json(response);
        });
}
function deleteExpediente(req: Request, res: Response): void {
    const CI: number = Number(req.params.CI);
    if (!CI) {
        const response: responseData = {
            status: 400,
            message: 'Datos de expediente inválidos',
            error: 'Invalid expediente data'
        };
        res.status(400).json(response);
        return;
    }

    Expediente.destroy({
        where: { CI: CI }
    })
        .then(() => {
            // Eliminamos los archivos asociados al expediente
            Files.findAll({
                where: { expedienteCI: CI }
            })
            .then((files: any[]) => {
                if (files.length > 0) {
                    for (const file of files) {
                        // Eliminamos el archivo del sistema de archivos
                        deleteFile(file.filename)
                            .then(() => {
                                console.log(`Archivo ${file.filename} eliminado exitosamente`);
                            })
                            .catch((error: { message: any; }) => {
                                console.error(`Error al eliminar el archivo ${file.filename}:`, error.message);
                            });
                    }
                }
                // Eliminamos los registros de archivos asociados al expediente
                Files.destroy({
                    where: { expedienteCI: CI }
                });
            });

            const response: responseData = {
                status: 200,
                message: 'Expediente eliminado exitosamente'
            };
            res.status(200).json(response);
        })
        .catch((error: { message: any; }) => {
            const response: responseData = {
                status: 500,
                message: 'Error al eliminar el expediente',
                error: error.message
            };
            res.status(500).json(response);
        });
}

/*
Obtiene una lista de expedientes especificando un número de página y un tamaño de página.
@param {request} req - La solicitud HTTP.
*/
function getExpedienteInList(req: Request, res: Response) {
    const page: number = Number(req.params.page) || 1;
    const pageSize: number = Number(req.params.pageSize) || 10;

    Expediente.findAndCountAll({
        limit: pageSize,
        offset: (page - 1) * pageSize
    })
        .then((result: { count: any; rows: any; }) => {
            const response: responseData = {
                status: 200,
                message: 'Lista de expedientes obtenida exitosamente',
                data: {
                    totalItems: result.count,
                    expedientes: result.rows
                }
            };
            res.status(200).json(response);
        })
        .catch((error: { message: any; }) => {
            const response: responseData = {
                status: 500,
                message: 'Error al obtener la lista de expedientes',
                error: error.message
            };
            res.status(500).json(response);
        });
}

async function getAvaibleExpedienteList(req: Request, res: Response) {
    const pageSize: number = Number(req.params.pageSize) || 10;
    
    const expedientes = await Expediente.findAll();
    
    if (!expedientes || expedientes.length === 0) {
        const response: responseData = {
            status: 404,
            message: 'No hay expedientes disponibles',
            error: 'No expedientes found'
        };
        res.status(404).json(response);
        return;
    }

    const expedienteCount = expedientes.length;
    const totalPages = Math.ceil(expedienteCount / pageSize);
    const response: responseData = {
        status: 200,
        message: 'Lista de expedientes obtenida exitosamente',
        data: totalPages
    };
    res.status(200).json(response);
}

export {
    createExpediente,
    updateExpediente,
    deleteExpediente,
    getExpedienteInList,
    getAvaibleExpedienteList
};