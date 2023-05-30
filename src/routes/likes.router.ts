import { LikeController } from "../app/controllers/LikeController";
import LikeDao from "../app/dao/like.dao";
import { Router } from "express";
import { LikeService } from "../app/services/Like.service";
import { autenticated } from "../middlewares/autenticated";

const router = Router();
const slug = "/likes";

router.use(autenticated)
router.post("/:postId", (req, res, next) => {
  const likerepository = new LikeDao();
  const likeService = new LikeService(likerepository);
  const likeController = new LikeController(likeService);

  return likeController.createPostLike(req, res, next);
});

export { router, slug };
