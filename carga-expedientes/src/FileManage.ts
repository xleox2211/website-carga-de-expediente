import axios from "axios";

const API_URL = "http://localhost:3000/expedientes";

export function getImageUrl(fileId: number): string {
    return `${API_URL}/image/${fileId}`;
}

export function DownloadFile(fileId: number): Promise<Blob> {
    return axios.get(`${API_URL}/files/${fileId}`, {
        responseType: "blob",
    }).then(response => response.data);
}