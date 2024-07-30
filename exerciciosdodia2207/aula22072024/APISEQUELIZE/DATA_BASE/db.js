//Importa as configurações do arquivo de configuração
require('dotenv').config();

//Importa o modulo do sequelize
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {dialect: 'mysql'});

module.exports = sequelize;