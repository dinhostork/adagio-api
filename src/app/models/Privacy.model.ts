'use strict';

const { DataTypes } = require('sequelize');
import sequelize from "../../config/database";

const Privacy = sequelize.define(
  'Privacy',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    privacy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'privacies',
    timestamps: false,
    
    freezeTableName: true,
  }
);

export default Privacy;