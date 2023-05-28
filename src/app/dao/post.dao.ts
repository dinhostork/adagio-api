import Post, { PostCreationAttributes } from "../models/Post.model";
import { PostRepository } from "../repositories/PostRepository";

export class PostDao implements PostRepository {
  async createPost(payload: PostCreationAttributes): Promise<Post> {
    const post = await Post.create(payload);
    return post;
  }
}
