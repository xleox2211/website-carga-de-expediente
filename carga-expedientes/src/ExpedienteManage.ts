import axios from "axios";

const API_URL = "http://localhost:3000/expedientes";

export async function getExpedientes(page: number, pageSize: number): Promise<Expediente[]> {
  const response = await axios.get(`${API_URL}/${page}/${pageSize}`);
  return response.data;
}

export async function addExpediente(expediente: FormData): Promise<Expediente> {
  const response = await axios.post(API_URL, expediente);
  return response.data;
}

export async function updateExpediente(expediente: FormData, CI : number): Promise<Expediente> {
  const response = await axios.put(`${API_URL}/${CI}`, expediente);
  return response.data;
}

export async function deleteExpediente(CI: number): Promise<void> {
  await axios.delete(`${API_URL}/${CI}`);
}

export async function getExpedientesPageCount(pageSize: number): Promise<number> {
  const response = await axios.get(`${API_URL}/count/${pageSize}`);
  return response.data.totalPages;
}

export async function getExpedienteFiles(CI: number): Promise<ExpeFile[]> {
  const response = await axios.get(`${API_URL}/expFiles/${CI}`);
  return response.data;
}