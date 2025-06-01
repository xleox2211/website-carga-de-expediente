import { Sequelize } from 'sequelize';

const DataBase = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

export default DataBase;