import { Sequelize } from 'sequelize';

const DataBase = new Sequelize({
  dialect: 'sqlite',
  storage: './db/db.sqlite',
  logging: false, // Disable logging for cleaner output
  retry: {
    max: 20, // Retry up to 20 times
    match: ['SQLITE_BUSY'], // Retry on SQLITE_BUSY errors
  }
});

export default DataBase;