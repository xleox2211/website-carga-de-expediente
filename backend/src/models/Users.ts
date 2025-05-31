import { Sequelize, DataTypes } from "sequelize";

const Users = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:', // or use a file path like 'database.sqlite'
});

const User = Users.define('User', {
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

const Admins = Users.define('Admin', {
    CI: {
        type: DataTypes.NUMBER,
        primaryKey: true
    }
})

// Sync the model with the database
Users.sync()
    .then(() => {
        console.log('Users table has been created.');
        // Create two users for testing
User.create({
    CI: 30162461,
    name: 'Sergio Ricaflor',
    user: 'sergioricaflor',
    password: 'password123',
    email: 'sergioricaflor@gmail.com',
    phone: '4120715252'
});

User.create({
    CI: 87654321,
    name: 'Jane Smith',
    user: 'janesmith',
    password: 'password456',
    email: 'janesmith@example.com',
    phone: '1234567890'
});

// Create an admin for testing
Admins.create({
    CI: 30162461
});

    })
    .catch((error) => {
        console.error('Error creating Users table:', error);
    });

export { Users, User, Admins };