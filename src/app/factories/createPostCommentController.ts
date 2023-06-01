import { PostCommentService } from "../services/PostComment.service";
import { PostCommentDao } from "../dao/postComment.dao";
import { PostCommentController } from "../controllers/PostCommentController";
import { PostService } from "../services/Post.service";
import { PostDao } from "../dao/post.dao";

export const makeCreatePostCommentController = () => {
  const postCommentRepository = new PostCommentDao();
  const postCommentService = new PostCommentService(postCommentRepository);

  const postRepository = new PostDao();
  const postService = new PostService(postRepository);

  const postCommentController = new PostCommentController(
    postCommentService,
    postService
  );
  return postCommentController;
};
