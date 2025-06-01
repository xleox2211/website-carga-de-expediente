import { Sequelize } from 'sequelize';

const DataBase = new Sequelize({
  dialect: 'sqlite',
  storage: './db/db.sqlite',
  logging: false, // Disable logging for cleaner output
});

export default DataBase;