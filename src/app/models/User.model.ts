import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database";
import bcrypt from "bcrypt";

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
}



export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "password">{}


export interface UserWithoutPassword extends Optional<UserAttributes, "password"> {}
class User
  extends Model<UserWithoutPassword, UserCreationAttributes>
  implements UserWithoutPassword
{
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "users",
    underscored: true,
    sequelize,
  }
);

User.addHook("beforeSave", async (user: User) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

export default User;
