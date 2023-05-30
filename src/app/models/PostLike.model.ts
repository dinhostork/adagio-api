import sequelize from "../../config/database";
import { DataTypes, Model, Optional } from "sequelize";

export interface PostLikeAttributes{
    id: string;
    post_id: string;
    user_id: string;
}

export interface PostLikeCreationalAttributes extends Optional<PostLikeAttributes, "id">{}

class PostLike extends Model<PostLikeAttributes, PostLikeCreationalAttributes> implements PostLikeAttributes {
    public id!: string;
    public post_id!: string;
    public user_id!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

PostLike.init({
    id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    post_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'post_likes',
    underscored: true,
});
        
export default PostLike;