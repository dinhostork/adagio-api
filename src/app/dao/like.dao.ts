import PostLike, {
  PostLikeCreationalAttributes,
} from "../models/PostLike.model";
import { LikeRepository } from "../repositories/LikeRepository";

class LikeDao implements LikeRepository {
  createPostLike = async (postLike: PostLikeCreationalAttributes) => {
    return await PostLike.create(postLike);
  };
}

export default LikeDao
