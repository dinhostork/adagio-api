import { Router, Response, NextFunction } from "express";
import { ProtectedRequest } from "../app/interfaces/protectedRequest";
import { PostController } from "../app/controllers/PostController";
import { PostService } from "../app/services/Post.service";
import { PostDao } from "../app/dao/post.dao";
import { autenticated } from "../middlewares/autenticated";
import { celebrate } from "celebrate";
import { postValidator } from "../app/validators/posts";

const router = Router();
const slug = "/posts";

router.use(autenticated);

router.post(
  "/",
  postValidator,
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const postRepository = new PostDao();
    const postService = new PostService(postRepository);
    const postController = new PostController(postService);

    return postController.createPost(req, res, next);
  }
);

export { router, slug };
