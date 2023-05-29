import { NextFunction, Response } from "express";
import { PostService } from "../services/Post.service";
import { ProtectedRequest } from "../interfaces/protectedRequest";
import { PostPayload } from "../interfaces/posts";

export class PostController {
  constructor(public readonly postService: PostService) {}

  public async createPost(
    req: ProtectedRequest,
    res: Response,
  ) {
      const { text, privacy_id, hasMedia } = req.body as PostPayload;
      const { userId } = req;

      const post = await this.postService.createPost({
        text,
        privacy_id,
        owner_id: userId!,
      });

      if (!hasMedia) {
        const publishedPost = await this.postService.setPublished(post.id);
        return res.json(publishedPost);
      }

      return res.json(post);
    
  }

  public async uploadFiles(
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { files } = req;
      const { postId } = req.params;

      const post = await this.postService.uploadFiles(
        files as Express.Multer.File[],
        postId
      );

      return res.json(post);
    } catch (err) {
      next(err);
    }
  }
}
