 
const Sequelize = require('sequelize');
const database = require('../data_base/db');
 
const Cadastro = database.define('cadastro', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    Nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Senha:  {
        type: Sequelize.STRING,
        allowNull: false
    }
    }, {



       timestamps: true, 
        hooks: {
          beforeCreate: (user, options) => {
            const now = new Date();
            const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000);
            user.createdAt = threeHoursLater;
            user.updatedAt = threeHoursLater;
          },
          beforeUpdate: (user, options) => {
            const now = new Date();
            const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000);
            user.updatedAt = threeHoursLater;
          }
    }
        
})


 
module.exports = Cadastro