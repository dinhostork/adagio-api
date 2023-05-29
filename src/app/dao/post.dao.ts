import PostFile from "../models/PostFile.model";
import File from "../models/File.model";
import Post, { PostCreationAttributes } from "../models/Post.model";
import { PostRepository } from "../repositories/PostRepository";

export class PostDao implements PostRepository {
  async createPost(payload: PostCreationAttributes): Promise<Post> {
    const post = await Post.create(payload);
    return post;
  }

  async setPublished(postId: string): Promise<Post> {
    const post = await Post.findOne({
      where: {
        id: postId,
      },
      include: [
        {
          model: PostFile,
          as: "files",
          attributes: ["id"],
          include: [
            {
              model: File,
              as: "file",
            },
          ],
        },
      ],
    });
    await post?.update({
      published: true,
    });
    return post!;
  }
  async uploadFiles(
    files: Express.Multer.File[],
    postId: string
  ): Promise<Post> {
    const fileCreationPromises = files.map(async (file) => {
      const savedFile = await File.create({
        filename: file.filename,
        mimetype: file.mimetype,
        original_name: file.originalname,
        url: file.path,
      });

      await PostFile.create({
        post_id: postId,
        file_id: savedFile.id,
      });
    });

    await Promise.all(fileCreationPromises);

    const post = await this.setPublished(postId);

    return post!;
  }

  async getPostByIdAndOwner(postId: string, userId: string): Promise<Post> {
    const post = await Post.findOne({
      where: {
        id: postId,
        owner_id: userId,
      },
      include: [
        {
          model: PostFile,
          as: "files",
          attributes: ["id"],
          include: [
            {
              model: File,
              as: "file",
            },
          ],
        },
      ],
    });
    return post!;
  }
}
