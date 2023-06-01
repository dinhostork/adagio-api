import { PostCommentService } from "../app/services/PostComment.service";
import { PostCommentDao } from "../app/dao/postComment.dao";
import { autenticated } from "../middlewares/autenticated";
import { Request, Response, NextFunction, Router } from "express";
import { PostCommentController } from "../app/controllers/PostCommentController";

const router = Router();
const slug = "/comments";

router.use(autenticated);
router.post(
  "/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const postCommentRepository = new PostCommentDao();
    const postCommentService = new PostCommentService(postCommentRepository);
    const postCommentController = new PostCommentController(postCommentService);
    return postCommentController.create(req, res);
  }
);

export { router, slug };
