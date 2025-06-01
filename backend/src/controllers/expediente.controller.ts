import { type Request, type Response } from "express";
import { Expediente } from "../models/Expedientes";

function expedienteValidation(expediente: Expediente): boolean {
    // Aquí puedes agregar la lógica de validación para el expediente
    if (!expediente.CI || !expediente.nombre || !expediente.profesor || !expediente.carrera) {
        return false;
    }
    return true;
}

function createExpediente(req : Request, res : Response): void {
    const newExpediente: Expediente = req.body;

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

    Expediente.create(newExpediente as any)
        .then((expediente: any) => {
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

export {
    createExpediente,
    updateExpediente,
    deleteExpediente,
    getExpedienteInList
};