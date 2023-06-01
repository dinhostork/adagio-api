import { PostCommentCreationAttributes } from "../models/PostComment.model";
import { PostCommentRepository } from "../repositories/PostCommentRepository";

export class PostCommentService {
  constructor(private readonly postCommentRepository: PostCommentRepository) {}

  async create(payload: PostCommentCreationAttributes) {
    return this.postCommentRepository.create(payload);
  }
}
