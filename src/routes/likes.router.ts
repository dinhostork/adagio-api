import { Router } from "express";
import { autenticated } from "../middlewares/autenticated";
import { createLikeController } from "../app/factories/crateLikeController";

const router = Router();
const slug = "/likes";

router.use(autenticated);
router.post("/:postId", (req, res, next) => {
  const likeController = createLikeController();

  return likeController.createPostLike(req, res, next);
});

export { router, slug };
