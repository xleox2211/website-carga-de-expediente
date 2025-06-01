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

interface File {
    id: number;
    expedienteCI: number;
    filename: string;
    fileExtension: string;
    fileSize: number;
}