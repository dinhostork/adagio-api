
import { Request, Response, NextFunction, Router } from "express";
import { makeCreatePostCommentController } from "../app/factories/createPostCommentController";
import { autenticated } from "../middlewares/autenticated";

const router = Router();
const slug = "/comments";

router.use(autenticated);
router.post(
  "/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    
    const postCommentController = makeCreatePostCommentController()
    return postCommentController.create(req, res, next);
  }
);

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const postCommentController = makeCreatePostCommentController()
  return postCommentController.update(req, res, next);
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const postCommentController = makeCreatePostCommentController()
  return postCommentController.delete(req, res, next);
});

router.get('/:postId', async (req: Request, res: Response, next: NextFunction) => {
  const postCommentController = makeCreatePostCommentController()
  return postCommentController.list(req, res, next);
});
export { router, slug };
