import Post, { PostCreationAttributes } from "../models/Post.model";

export interface PostRepository {
  createPost(post: PostCreationAttributes): Promise<Post>;
}
