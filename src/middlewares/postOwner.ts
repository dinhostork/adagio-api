import { BadRequestError, HttpError } from "../utils/errors/httpErrors";
import { ProtectedRequest } from "../app/interfaces/protectedRequest";
import { NextFunction, Request, Response } from "express";
import { PostService } from "../app/services/Post.service";
import { PostDao } from "../app/dao/post.dao";

export const postOwner = async (
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;
    const { postId } = req.params;
    const postDao = new PostDao();
    const postService = new PostService(postDao);

    const post = await postService.getPostByIdAndOwner(postId, userId!);

    if (!post) {
      throw new BadRequestError("Você não é o dono desta publicação");
    }
    return next();
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
