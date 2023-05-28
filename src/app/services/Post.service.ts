import Post, { PostCreationAttributes } from "../models/Post.model";
import { PostRepository } from "../repositories/PostRepository";

export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async createPost(post: PostCreationAttributes): Promise<Post> {
    return this.postRepository.createPost(post);
  }
}
