'use strict';

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';
import File from './File.model';

export interface PostFileAttributes {
  id: string;
  post_id: string;
  file_id: string;
}


export interface PostFileCreationAttributes
  extends Optional<PostFileAttributes, 'id'> {}

class PostFile extends Model<PostFileAttributes, PostFileCreationAttributes> implements PostFileAttributes{
  public id!: string;
  public post_id!: string;
  public file_id!: string;
}

PostFile.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.STRING,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'posts',
        key: 'id',
      },
      
    },
    file_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'post_files',
    underscored: true,
    sequelize,
  }
);

PostFile.belongsTo(File, {foreignKey: 'file_id', as: 'file'});

export default PostFile;
