import PostComment, {
  PostCommentCreationAttributes,
} from "../models/PostComment.model";
import { PostCommentRepository } from "../repositories/PostCommentRepository";

export class PostCommentDao implements PostCommentRepository {
  async create(payload: PostCommentCreationAttributes) {
    const comment = await PostComment.create(payload);
    return comment;
  }
}
