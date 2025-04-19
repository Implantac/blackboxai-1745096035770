const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transacao = sequelize.define('Transacao', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipo: {
    type: DataTypes.ENUM('entrada', 'saida'),
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  metodoPagamento: {
    type: DataTypes.ENUM('dinheiro', 'cartao', 'pix', 'outro'),
    defaultValue: 'dinheiro',
  },
  referenciaTEF: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'transacoes',
  timestamps: true,
});

module.exports = Transacao;
