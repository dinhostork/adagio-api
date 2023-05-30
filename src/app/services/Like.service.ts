import PostLike, { PostLikeCreationalAttributes } from "../models/PostLike.model";
import { LikeRepository } from "../repositories/LikeRepository";

export class LikeService {
    constructor(private readonly likeRepository: LikeRepository) {}

    public async createPostLike(postLike: PostLikeCreationalAttributes): Promise<PostLike> {
        return await this.likeRepository.createPostLike(postLike);
    }
}
