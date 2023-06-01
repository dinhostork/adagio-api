import { PostCommentCreationAttributes } from "../models/PostComment.model";
import { PostCommentRepository } from "../repositories/PostCommentRepository";

export class PostCommentService {
  constructor(private readonly postCommentRepository: PostCommentRepository) {}

  async create(payload: PostCommentCreationAttributes) {
    return this.postCommentRepository.create(payload);
  }

  async getCommentById(id: string) {
    return this.postCommentRepository.getCommentById(id);
  }

  async update(id: string, payload: PostCommentCreationAttributes) {
    return this.postCommentRepository.update(id, payload);
  }

  async delete(id: string) {
    return this.postCommentRepository.delete(id);
  }
}
