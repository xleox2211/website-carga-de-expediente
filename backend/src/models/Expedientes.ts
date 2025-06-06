import { DataTypes } from "sequelize";
import DataBase from "./DB.js";

const Expediente = DataBase.define('Expediente', {
    CI: {
        type: DataTypes.NUMBER,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profesor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fechaModificacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    carrera: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const FileModel = DataBase.define('File', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    expedienteCI: {
        type: DataTypes.NUMBER,
        allowNull: false,
        references: {
            model: Expediente,
            key: 'CI'
        }
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    originalName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fileExtension: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fileSize: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// a expediente can have many files
Expediente.hasMany(FileModel, {
    foreignKey: 'expedienteCI',
    sourceKey: 'CI'
});

// a file belongs to a expediente
FileModel.belongsTo(Expediente, {
    foreignKey: 'expedienteCI',
    targetKey: 'CI'
});

// Sync the model with the database
DataBase.sync()
    .then(() => {
        console.log('Expedientes and Files tables have been created.');
    })
    .catch((error) => {
        console.error('Error creating tables:', error);
    });

export { Expediente, FileModel };