const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProdutoMinibar = sequelize.define('ProdutoMinibar', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  alertaReposicao: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
  },
}, {
  tableName: 'produtos_minibar',
  timestamps: true,
});

module.exports = ProdutoMinibar;
