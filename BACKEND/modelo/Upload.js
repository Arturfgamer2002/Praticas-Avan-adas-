const Sequelize = require('sequelize');
const database = require('../data_base/db');
const artista = require('./usuario')
const { DataTypes } = require('sequelize');

const Upload = database.define('upload', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  artistaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: artista,   // Model ao qual se refere
      key: 'id'      // Chave da tabela User que está sendo referenciada
    },
    onUpdate: 'CASCADE',   // Ação ao atualizar o id do usuário
    onDelete: 'CASCADE',
  },
  nomeArquivo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dados: {
    type: DataTypes.BLOB('long'), // Especifica um LONGBLOB
    allowNull: false
  }
}, {

  // Configurações do modelo
  timestamps: true, // Habilita createdAt e updatedAt
  hooks: {
    beforeCreate: (upload, options) => {
      const now = new Date();
      const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000);
      upload.createdAt = threeHoursLater;
      upload.updatedAt = threeHoursLater;
    },
    beforeUpdate: (upload, options) => {
      const now = new Date();
      const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000);
      upload.updatedAt = threeHoursLater;
    }
  }

})

artista.hasMany(Upload, { foreignKey: 'artistaId' });
Upload.belongsTo(artista, { foreignKey: 'artistaId' });
module.exports = Upload;