import axios from 'axios'

const API_URL = 'http://localhost:3000/users';

export async function userLogin(username: string, password: string): Promise<responseData> {
    try {
        const response = await axios.post(`${API_URL}/login`, { user: username, password });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw {
                status: error.response?.status || 500,
                message: 'Login failed',
                error: error.message
            };
        } else {
            throw {
                status: 500,
                message: 'Login failed',
                error: (error as Error).message || String(error)
            };
        }
    }
}