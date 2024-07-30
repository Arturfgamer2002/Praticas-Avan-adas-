const Sequelize = require('sequelize');
const DATABASE = require('../DATA_BASE/db');

const Usuario = DATABASE.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    //Configurações do modelo
    timestamps: true, //Desativando createdAt e updatedAt
    hooks: {
        befareCreate: (user, options) => {
            const now = new Date();
            const threeHoursLater = new Data(now.getTime() - 3 * 60 * 60 * 10000);
            user.createdAt = threeHoursLater;
            user.updatedAt = threeHoursLater;
        },
        befareUpdate: (user, options) => {
            const now = new Date();
            const threeHoursLater = new Data(now.getTime() - 3 * 60 * 60 * 10000);
            user.updatedAt = threeHoursLater;
        }
    }
})

module.exports = Usuario;