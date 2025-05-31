import { request, response } from "express";
import User from "../models/Users";


const createUser = (req = request, res = response) => {
    // Lógica para crear usuario
    const newUser: User = req.body;

    // Validación del usuario
    if (!userValidation(newUser)) {
        const response: responseData = {
            status: 400,
            message: 'Datos de usuario inválidos',
            error: 'Invalid user data'
        };
        return res.status(400).json(response);
    }

    User.create(newUser as any)
        .then((user) => {
            const response: responseData = {
                status: 201,
                message: 'Usuario creado exitosamente',
                data: user
            };
            res.status(201).json(response);
        })
        .catch((error) => {
            const response: responseData = {
                status: 500,
                message: 'Error al crear el usuario',
                error: error.message
            };
            res.status(500).json(response);
        });

    res.json(response);
};

const updateUser = (req = request, res = response) => {
    
    const UserData: User = req.body;

    // Validación del usuario
    if (!userValidation(UserData)) {
        const response: responseData = {
            status: 400,
            message: 'Datos de usuario inválidos',
            error: 'Invalid user data'
        };
        return res.status(400).json(response);
    }

    User.update(UserData as any, {
        where: {
            CI: UserData.CI
        }
    })
    .then(() => {
        const response: responseData = {
            status: 200,
            message: 'Usuario actualizado exitosamente',
            data: UserData
        };
        res.status(200).json(response);
    })
    .catch((error) => {
        const response: responseData = {
            status: 500,
            message: 'Error al actualizar el usuario',
            error: error.message
        };
        res.status(500).json(response);
    });

    res.json({ message: 'Usuario actualizado' });
};

const deleteUser = (req = request, res = response) => {
    const { CI } = req.params;

    // Validación del CI
    if (!CI || isNaN(Number(CI))) {
        const response: responseData = {
            status: 400,
            message: 'CI inválido',
            error: 'Invalid CI'
        };
        return res.status(400).json(response);
    }

    User.destroy({
        where: {
            CI: Number(CI)
        }
    })

    const response: responseData = {
        status: 200,
        message: 'Usuario eliminado exitosamente'
    };

    res.json(response);
};

const loginUser = (req = request, res = response) => {
    const { user, password } = req.body;

    // Validación de los datos de inicio de sesión
    if (!user || !password) {
        const response: responseData = {
            status: 400,
            message: 'Datos de inicio de sesión inválidos',
            error: 'Invalid login data'
        };
        return res.status(400).json(response);
    }

    User.findOne({
        where: {
            user: user,
            password: password
        }
    }).then((foundUser) => {
        if (!foundUser) {
            const response: responseData = {
                status: 401,
                message: 'Usuario o contraseña incorrectos',
                error: 'Invalid username or password',
                data: false
            };
            return res.status(401).json(response);
        }

        const response: responseData = {
            status: 200,
            message: 'Inicio de sesión exitoso',
            data: true
        };
        res.status(200).json(response);
    })
    
    res.json({ message: 'Datos de inicio de sesión inválidos' });
};

function userValidation(toValid : User) : boolean {
    if (!toValid || !toValid.name || !toValid.email || !toValid.password || !toValid.CI || !toValid.phone || !toValid.user) {
        return false;
    }

    if (toValid.name.length < 3 || toValid.name.length > 50) {
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(toValid.email)) {
        return false;
    }

    return true;
}

export {
    createUser,
    updateUser,
    deleteUser,
    loginUser
};