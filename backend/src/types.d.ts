interface responseData {
    status: number;
    message: string;
    data?: User | any;
    error?: string;
}

interface User {
    CI: number;
    name: string;
    user: string;
    password: string;
    email: string;
    phone: string;
}

interface Expediente {
  CI: number;
  nombre: string;
  profesor: string;
  fechaCreacion: string;
  fechaModificacion: string;
  carrera: string;
}

interface ExpedienteFile {
    id: number;
    expedienteCI: number;
    filename: string;
    fileExtension: string;
    fileSize: number;
}

interface fileRequest extends Request {
    expedienteCI?: number;
    files?: any[];
}