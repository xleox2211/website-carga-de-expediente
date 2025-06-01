import { DataTypes } from "sequelize";
import DataBase from "./DB.js";

const User = DataBase.define('User', {
    CI: {
        type: DataTypes.NUMBER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Admins = DataBase.define('Admin', {
    CI: {
        type: DataTypes.NUMBER,
        primaryKey: true
    }
})

// Sync the model with the database
DataBase.sync()
    .then(() => {
        console.log('Users table has been created.');
        // Create two users for testing

// Crear usuarios de prueba solo si no existen
User.findOrCreate({
    where: { CI: 30162461 },
    defaults: {
        name: 'Sergio Ricaflor',
        user: 'sergioricaflor',
        password: 'password123',
        email: 'sergioricaflor@gmail.com',
        phone: '4120715252'
    }
});

User.findOrCreate({
    where: { CI: 87654321 },
    defaults: {
        name: 'Jane Smith',
        user: 'janesmith',
        password: 'password456',
        email: 'janesmith@example.com',
        phone: '1234567890'
    }
});


// Create an admin for testing
Admins.findOrCreate({
    where: { CI: 30162461 },
});

    })
    .catch((error) => {
        console.error('Error creating Users table:', error);
    });

export {  User, Admins };