import { Router, Response, NextFunction } from "express";
import { ProtectedRequest } from "../app/interfaces/protectedRequest";
import { autenticated } from "../middlewares/autenticated";
import { postValidator } from "../app/validators/posts";
import { upload } from "../storage/upload";
import { createPostController } from "../app/factories/createPostController";
import { postOwner } from "../middlewares/postOwner";

const router = Router();
const slug = "/posts";

router.use(autenticated);

router.post(
  "/",
  postValidator,
  async (req: ProtectedRequest, res: Response) => {
    const postController = createPostController();
    return postController.createPost(req, res);
  }
);

// only owner can upload files
router.post(
  "/:postId/files",
  upload.array("file"),
  postOwner,
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const postController = createPostController();
    return postController.uploadFiles(req, res, next);
  }
);

export { router, slug };
