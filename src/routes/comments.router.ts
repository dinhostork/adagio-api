import { PostCommentService } from "../app/services/PostComment.service";
import { PostCommentDao } from "../app/dao/postComment.dao";
import { autenticated } from "../middlewares/autenticated";
import { Request, Response, NextFunction, Router } from "express";
import { PostCommentController } from "../app/controllers/PostCommentController";
import { PostService } from "../app/services/Post.service";
import { PostDao } from "../app/dao/post.dao";

const router = Router();
const slug = "/comments";

router.use(autenticated);
router.post(
  "/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const postCommentRepository = new PostCommentDao();
    const postCommentService = new PostCommentService(postCommentRepository);

    const postRepository = new PostDao();
    const postService = new PostService(postRepository);

    const postCommentController = new PostCommentController(
      postCommentService,
      postService
    );
    return postCommentController.create(req, res, next);
  }
);

export { router, slug };
