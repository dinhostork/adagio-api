import PostComment, {
  PostCommentCreationAttributes,
} from "../models/PostComment.model";
import { PostCommentRepository } from "../repositories/PostCommentRepository";

export class PostCommentDao implements PostCommentRepository {
  async create(payload: PostCommentCreationAttributes) {
    const comment = await PostComment.create(payload);
    return comment;
  }
  async getCommentById(id: string) {
    const comment = await PostComment.findByPk(id);
    return comment;
  }

  async update(id: string, payload: PostCommentCreationAttributes) {
    const comment = await this.getCommentById(id);
    comment?.update(payload);
    return comment;
  }
}
