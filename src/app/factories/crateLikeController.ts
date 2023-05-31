import { LikeController } from "../../app/controllers/LikeController";
import LikeDao from "../../app/dao/like.dao";
import { LikeService } from "../../app/services/Like.service";
import { PostService } from "../../app/services/Post.service";
import { PostDao } from "../../app/dao/post.dao";

export const createLikeController = () => {
  const likerepository = new LikeDao();
  const likeService = new LikeService(likerepository);
  const postRepository = new PostDao();
  const postService = new PostService(postRepository);
  const likeController = new LikeController(likeService, postService);
  return likeController;
};
