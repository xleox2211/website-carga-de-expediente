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

// Sync the model with the database
Users.sync()
    .then(() => {
        console.log('Users table has been created.');
    })
    .catch((error) => {
        console.error('Error creating Users table:', error);
    });

export default User;