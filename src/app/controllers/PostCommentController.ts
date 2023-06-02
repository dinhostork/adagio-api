import { NextFunction, Request, Response } from "express";
import { PostCommentService } from "../services/PostComment.service";
import { ProtectedRequest } from "../interfaces/protectedRequest";
import { PostService } from "../services/Post.service";
import { NotFoundError } from "../../utils/errors/httpErrors";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export class PostCommentController {
  constructor(
    private readonly postCommentService: PostCommentService,
    private readonly postService: PostService
  ) {}

  async postExists(postId: string) {
    const post = await this.postService.getPostById(postId);
    return post;
  }

  async commentExists(commentId: string) {
    const comment = await this.postCommentService.getCommentById(commentId);
    return comment;
  }

  async create(req: ProtectedRequest, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params;
      const { userId } = req;
      const { text } = req.body;

      const post = await this.postExists(postId);

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
  async update(req: ProtectedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId } = req;
      const { text } = req.body;

      const commentExists = await this.commentExists(id);

      if (!commentExists) {
        throw new NotFoundError("Comentário não encontrado");
      }

      const payload = {
        text,
        owner_id: userId!,
        post_id: commentExists.post_id,
      };

      const comment = await this.postCommentService.update(id, payload);
      return res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: ProtectedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const commentExists = await this.commentExists(id);

      if (!commentExists) {
        throw new NotFoundError("Comentário não encontrado");
      }

      await this.postCommentService.delete(id);
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  async list(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response,
    next: NextFunction
  ) {
    try {
   

      const { postId } = req.params;
      let page = req.query.page as unknown as number;
      let limit = req.query.limit as unknown as number;



      if (!page) {
        page = 1;
      }

      const post = await this.postExists(postId);

      if (!post) {
        throw new NotFoundError("Publicação não encontrada");
      }

      const comments = await this.postCommentService.list(
        postId,
        req.query.page as unknown as number,
        req.query.limit as unknown as number,
      );

      return res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  }
}
