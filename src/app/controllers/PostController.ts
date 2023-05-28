import { NextFunction, Response } from "express";
import { PostService } from "../services/Post.service";
import { ProtectedRequest } from "../interfaces/protectedRequest";

export class PostController {
  constructor(public readonly postService: PostService) {}

  public async createPost(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { text, privacy_id } = req.body;
      const { userId } = req;

      const post = await this.postService.createPost({
        text,
        privacy_id,
        owner_id: userId!,
      });
      return res.json(post);
    } catch (err) {
      next(err);
    }
  }
}
