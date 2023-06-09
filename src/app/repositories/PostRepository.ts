import Post, { PostCreationAttributes } from "../models/Post.model";

export interface PostRepository {
  getPostById(postId: string): Post | PromiseLike<Post>;
  createPost(post: PostCreationAttributes): Promise<Post>;
  uploadFiles(files: Express.Multer.File[], postId: string): Promise<Post>;
  setPublished(postId: string): Promise<Post>;
  getPostByIdAndOwner(postId: string, userId: string): Promise<Post>;
}
