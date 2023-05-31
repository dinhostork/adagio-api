import PostLike, {
  PostLikeCreationalAttributes,
} from "../models/PostLike.model";
import { LikeRepository } from "../repositories/LikeRepository";

class LikeDao implements LikeRepository {
  createPostLike = async (postLike: PostLikeCreationalAttributes) => {
    return await PostLike.create(postLike);
  };

  userLiked = async (postLike: PostLikeCreationalAttributes) => {
    const like = await PostLike.findOne({
      where: {
        post_id: postLike.post_id,
        user_id: postLike.user_id,
      },
    });

    return !!like;
  };

  deletePostLike = async (postLike: PostLikeCreationalAttributes) => {
    return await PostLike.destroy({
      where: {
        post_id: postLike.post_id,
        user_id: postLike.user_id,
      },
    });
  };
}

export default LikeDao;
