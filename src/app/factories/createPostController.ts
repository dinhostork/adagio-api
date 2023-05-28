import { PostController } from "../../app/controllers/PostController";
import { PostService } from "../../app/services/Post.service";
import { PostDao } from "../../app/dao/post.dao";

export const createPostController = () => {
  const postRepository = new PostDao();
  const postService = new PostService(postRepository);
  const postController = new PostController(postService);
  return postController;
};
