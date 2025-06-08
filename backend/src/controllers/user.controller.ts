import { request, response as expressResponse } from "express";
import {User, Admins} from "../models/Users";


const createUser = (req = request, res = expressResponse) : void => {
    // Lógica para crear usuario
    const newUser: User = req.body;

    // Validación del usuario
    if (!userValidation(newUser)) {
        const response: responseData = {
            status: 400,
            message: 'Datos de usuario inválidos',
            error: 'Invalid user data'
        };
        res.status(400).json(response);
        return 
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
};

const updateUser = (req = request, res = expressResponse): void => {
    const CI = req.params.CI;
    const UserData: User = req.body;

    // Validación del usuario
    if (!userValidation(UserData)) {
        const response: responseData = {
            status: 400,
            message: 'Datos de usuario inválidos',
            error: 'Invalid user data'
        };
        res.status(400).json(response);
        return ;
    }
    // Validación del CI
    User.update(UserData as any, {
        where: {
            CI: Number(CI)
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

const deleteUser = (req = request, res = expressResponse): void => {
    const { CI } = req.params;

    // Validación del CI
    if (!CI || isNaN(Number(CI))) {
        const response: responseData = {
            status: 400,
            message: 'CI inválido',
            error: 'Invalid CI'
        };
        res.status(400).json(response);
        return;
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

const loginUser = (req = request, res = expressResponse): void => {
    const { user, password } = req.body;

    // Validación de los datos de inicio de sesión
    if (!user || !password) {
        const responseDataObj: responseData = {
            status: 400,
            message: 'Datos de inicio de sesión inválidos',
            error: 'Invalid login data'
        };
        res.status(400).json(responseDataObj);
        return;
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
            res.status(401).json(response);
            return;
        }

        const response: responseData = {
            status: 200,
            message: 'Inicio de sesión exitoso',
            data: foundUser
        };
        res.status(200).json(response);
    })
};

async function upgradeUser(req = request, res = expressResponse): Promise<void> {
    const { CI: toUpgrade } = req.params;

    const user = await User.findOne({
        where: {
            CI: toUpgrade
        }});

    if (!user) {
        const response: responseData = {
            status: 404,
            message: 'Usuario no encontrado',
            error: 'User not found'
        };
        res.status(404).json(response);
        return;
    }

    const adminExists = await Admins.findOne({
        where: {
            CI: toUpgrade
        }});
    
    if (adminExists) {
        const response: responseData = {
            status: 400,
            message: 'El usuario ya es un administrador',
            error: 'User is already an admin'
        };
        res.status(400).json(response);
        return;
    }

    const newAdmin = await Admins.create({
        where: {
            CI: toUpgrade
        }
    });

    if (!newAdmin) {
        const response: responseData = {
            status: 500,
            message: 'Error al promover el usuario a administrador',
            error: 'Failed to promote user to admin'
        };
        res.status(500).json(response);
        return;
    }

    const response: responseData = {
        status: 200,
        message: 'Usuario promovido a administrador exitosamente',
        data: newAdmin
    };
    res.status(200).json(response);
}

async function downgradeUser(req = request, res = expressResponse): Promise<void> {
    const { CI: toDowngrade } = req.params;
    const admin = await Admins.findOne({
        where: {
            CI: toDowngrade
        }});
    
    if (!admin) {
        const response: responseData = {
            status: 404,
            message: 'Administrador no encontrado',
            error: 'Admin not found'
        };
        res.status(404).json(response);
        return;
    }

    await Admins.destroy({
        where: {
            CI: toDowngrade
        }
    });

    const response: responseData = {
        status: 200,
        message: 'Administrador degradado a usuario exitosamente',
        data: null
    };

    res.status(200).json(response);
}

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

async function getAllUsers(req = request, res = expressResponse): Promise<void> {
    const pageSize = parseInt(req.params.pageSize as string) || 10;
    const page = parseInt(req.params.page as string) || 1;

    const users = await User.findAll({
        limit: pageSize,
        offset: (page - 1) * pageSize
    });

    res.json(users);
}

async function isAdmin(req = request, res = expressResponse): Promise<void> {
    const { CI } = req.params;
    console.log(`Checking if user with CI ${CI} is an admin`);

    const admin = await Admins.findOne({
        where: {
            CI: Number(CI)
        }
    });
    if (!admin) {
        const response: responseData = {
            status: 404,
            message: 'Administrador no encontrado',
            error: 'Admin not found',
            data: false
        };
        res.status(200).json(response);
        return;
    }
    const response: responseData = {
        status: 200,
        message: 'Administrador encontrado',
        data: true
    };
    res.status(200).json(response);
}

export {
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    upgradeUser,
    downgradeUser,
    getAllUsers,
    isAdmin
};