"use strict";

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database";

export interface FileAttributes {
  id: string;
  original_name: string;
  filename: string;
  mimetype: string;
  url: string;
}

class File
  extends Model<FileAttributes, FileCreationAttributes>
  implements FileAttributes
{
  public id!: string;
  public original_name!: string;
  public filename!: string;
  public mimetype!: string;
  public url!: string;
}

export interface FileCreationAttributes
  extends Optional<FileAttributes, "id"> {}

File.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    original_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: "files",
    sequelize,
  }
);

export default File;
