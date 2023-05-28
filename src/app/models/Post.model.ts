import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database";
import User from "./User.model";
import Privacy from "./Privacy.model";

export interface PostAttributes {
  id: string;
  text: string;
  owner_id: string;
  privacy_id: number;
}

export interface PostCreationAttributes
  extends Optional<PostAttributes, "id"> {}

class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  public id!: string;
  public owner_id!: string;
  public privacy_id!: number;
  public text!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    owner_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    privacy_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "posts",
    underscored: true,
    sequelize,
  }
);

Post.belongsTo(User, {
  foreignKey: "owner_id",
  as: "owner",
});

Post.belongsTo(Privacy, {
  foreignKey: "privacy_id",
  as: "privacy",
});
export default Post;
