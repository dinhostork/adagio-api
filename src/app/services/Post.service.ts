import Post, { PostCreationAttributes } from "../models/Post.model";
import { PostRepository } from "../repositories/PostRepository";

export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async createPost(post: PostCreationAttributes): Promise<Post> {
    return this.postRepository.createPost(post);
  }

  public async setPublished(postId: string): Promise<Post> {
    return this.postRepository.setPublished(postId);
  }

  public async uploadFiles(
    files: Express.Multer.File[],
    postId: string
  ): Promise<Post> {
    return this.postRepository.uploadFiles(files, postId);
  }
}
