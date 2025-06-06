interface Expediente {
  CI: number;
  nombre: string;
  profesor: string;
  fechaCreacion: string;
  fechaModificacion: string;
  carrera: string;
}

interface ExpeFile{
  expedienteCI: number;
  fileExtension: string;
  fileSize: number;
  originalName: string;
  filename: string;
  id: number;
}

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