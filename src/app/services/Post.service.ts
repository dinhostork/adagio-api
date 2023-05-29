import { BadRequestError } from "../../utils/errors/httpErrors";
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
    const allowedTypes = ["image", "audio", "video"];

    for (const file of files) {
      const fileType = file.mimetype.split("/")[0];

      if (!allowedTypes.includes(fileType)) {
        throw new BadRequestError(
          "Tipo de arquivo inválido. Apenas imagens, áudios e vídeos são permitidos."
        );
      }
    }

    return this.postRepository.uploadFiles(files, postId);
  }

  public async getPostByIdAndOwner(postId: string, idUser: string): Promise<Post> {
    return this.postRepository.getPostByIdAndOwner(postId, idUser);
  }
}
