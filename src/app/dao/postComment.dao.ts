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

  async delete(id: string) {
    const comment = await this.getCommentById(id);
    comment?.destroy();
    return comment;
  }

  async listPaginated(postId: string, page: number, limit: number) {
    const offset = (page - 1) * limit;
  
    const commentsAll = await PostComment.findAndCountAll({
      where: {
        post_id: postId,
      },
      offset,
      limit,
    });
  
    const { rows: comments, count } = commentsAll;
  
    return {
      comments,
      count,
    };
  }
  
  
}
