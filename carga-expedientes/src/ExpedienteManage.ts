import axios from "axios";

const API_URL = "http://localhost:3000/expedientes";

export async function getExpedientes(page: number, pageSize: number): Promise<Expediente[]> {
  const response = await axios.get(`${API_URL}/${page}/${pageSize}`);
  return response.data.data.expedientes;
}

export async function addExpediente(expediente: Expediente): Promise<Expediente> {
  const response = await axios.post(API_URL, expediente);
  return response.data;
}

export async function updateExpediente(expediente: Expediente, CI : number): Promise<Expediente> {
  const response = await axios.put(`${API_URL}/${CI}`, expediente);
  return response.data;
}

export async function deleteExpediente(CI: number): Promise<void> {
  await axios.delete(`${API_URL}/${CI}`);
}