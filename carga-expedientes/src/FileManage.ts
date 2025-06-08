import axios from "axios";

const API_URL = "http://localhost:3000/expedientes";

export function getImageUrl(fileId: number): string {
    return `${API_URL}/image/${fileId}`;
}

export async function DownloadFile(fileId: number): Promise<Blob> {
    const response = await axios.get(`${API_URL}/files/${fileId}`, {
        responseType: "blob",
    });
    return response.data;
}

export async function deleteExpedienteFile(fileId: number, expedienteCI: number): Promise<void> {
    await axios.delete(`${API_URL}/files/${expedienteCI}/${fileId}`);
}