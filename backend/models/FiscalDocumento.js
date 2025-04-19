const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FiscalDocumento = sequelize.define('FiscalDocumento', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipoDocumento: {
    type: DataTypes.ENUM('NFC-e', 'SAT', 'CF-e'),
    allowNull: false,
  },
  dadosCupom: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  arquivoExportado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dataEmissao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'fiscal_documentos',
  timestamps: true,
});

module.exports = FiscalDocumento;
