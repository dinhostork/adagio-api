import { NextFunction, Response } from "express";
import { LikeService } from "../services/Like.service";
import { ProtectedRequest } from "../interfaces/protectedRequest";
import { PostService } from "../services/Post.service";
import { NotFoundError } from "../../utils/errors/httpErrors";

export class LikeController {
  constructor(
    private likeService: LikeService,
    private postService: PostService
  ) {}

  public async createPostLike(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { postId } = req.params;
      const { userId } = req;

      const postExists = await this.postService.getPostById(postId);

      if (!postExists) {
        throw new NotFoundError("Publicação não encontrada");
      }

      const userLiked = await this.likeService.userLiked({
        post_id: postId,
        user_id: userId!,
      });

      if (userLiked) {
        await this.likeService.deletePostLike({
          post_id: postId,
          user_id: userId!,
        });

        return res.status(204).json();
      }
      const postLike = await this.likeService.createPostLike({
        post_id: postId,
        user_id: userId!,
      });

      return res.status(201).json(postLike);
    } catch (err) {
      next(err);
    }
  }
}
