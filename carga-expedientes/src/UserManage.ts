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

export async function userRegister(newUser: User): Promise<responseData> {
    try {
        const response = await axios.post(`${API_URL}/create`, newUser);
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            throw {
                status: error.response?.status || 500,
                message: 'Registration failed',
                error: error.message
            };
        } else {
            throw {
                status: 500,
                message: 'Registration failed',
                error: (error as Error).message || String(error)
            };
        }
    }
}

export async function userEdit(user: User, CI: number): Promise<responseData> {
    try {
        const response = await axios.put(`${API_URL}/update/${CI}`, user);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw {
                status: error.response?.status || 500,
                message: 'Edit failed',
                error: error.message
            };
        } else {
            throw {
                status: 500,
                message: 'Edit failed',
                error: (error as Error).message || String(error)
            };
        }
    }
}

export async function userDelete(CI: number): Promise<responseData> {
    try {
        const response = await axios.delete(`${API_URL}/delete/${CI}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw {
                status: error.response?.status || 500,
                message: 'Delete failed',
                error: error.message
            };
        } else {
            throw {
                status: 500,
                message: 'Delete failed',
                error: (error as Error).message || String(error)
            };
        }
    }
}

export async function userGetAll(pageSize: number, page : number) : Promise<responseData> {
   try {
        const response = await axios.get(`${API_URL}/getAll`, {
            params: {
                pageSize,
                page
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw {
                status: error.response?.status || 500,
                message: 'Fetch failed',
                error: error.message
            };
        } else {
            throw {
                status: 500,
                message: 'Fetch failed',
                error: (error as Error).message || String(error)
            };
        }
    }
}

export async function userIsAdmin(CI: number): Promise<boolean> {
    const response = await axios.get(`${API_URL}/isAdmin/${CI}`);
    if (response.status === 200) {
        return response.data.data;
    }
    return false;
}