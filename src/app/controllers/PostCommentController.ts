import { NextFunction, Response } from "express";
import { PostCommentService } from "../services/PostComment.service";
import { ProtectedRequest } from "../interfaces/protectedRequest";
import { PostService } from "../services/Post.service";
import {  NotFoundError } from "@/utils/errors/httpErrors";

export class PostCommentController {
  constructor(
    private readonly postCommentService: PostCommentService,
    private readonly postService: PostService
  ) {}
  async create(req: ProtectedRequest, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params;
      const { userId } = req;
      const { text } = req.body;

      const post = await this.postService.getPostById(postId);

      if (!post) {
        throw new NotFoundError("Publicação não encontrada");
      }
      const payload = {
        text,
        post_id: postId,
        owner_id: userId!,
      };

      const comment = await this.postCommentService.create(payload);

      return res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  }
}
