import { NextFunction, Response } from "express";
import { LikeService } from "../services/Like.service";
import { ProtectedRequest } from "../interfaces/protectedRequest";

export class LikeController {
  constructor(private likeService: LikeService) {}

  public async createPostLike(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { postId } = req.params;
    const { userId } = req;

    const postLike = await this.likeService.createPostLike({
      post_id: postId,
      user_id: userId!,
    });

    res.status(201).json(postLike);
  }
}
