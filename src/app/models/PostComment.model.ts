"use strict";
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database";

export interface PostCommentAttributes {
  id: string;
  text: string;
  post_id: string;
  owner_id: string;
}

export interface PostCommentCreationAttributes
  extends Optional<PostCommentAttributes, "id"> {}

export class PostComment
  extends Model<PostCommentAttributes, PostCommentCreationAttributes>
  implements PostCommentAttributes
{
  public id!: string;
  public text!: string;
  public post_id!: string;
  public owner_id!: string;
}

PostComment.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "post_comments",
    underscored: true,
    sequelize,
  }
);

export default PostComment;
