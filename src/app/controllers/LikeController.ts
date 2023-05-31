import { NextFunction, Response } from "express";
import { LikeService } from "../services/Like.service";
import { ProtectedRequest } from "../interfaces/protectedRequest";

export class LikeController {
  constructor(private likeService: LikeService) {}

  public async createPostLike(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ) {
    const { postId } = req.params;
    const { userId } = req;

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
  }
}
