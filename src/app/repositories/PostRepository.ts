import Post, { PostCreationAttributes } from "../models/Post.model";

export interface PostRepository {
  createPost(post: PostCreationAttributes): Promise<Post>;
  uploadFiles(files: Express.Multer.File[], postId: string): Promise<Post>;
  setPublished(postId: string): Promise<Post>;
}
