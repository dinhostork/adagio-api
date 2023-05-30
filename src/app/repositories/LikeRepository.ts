import PostLike, { PostLikeCreationalAttributes } from "../models/PostLike.model";

export interface LikeRepository {
    createPostLike: (postLike: PostLikeCreationalAttributes) => Promise<PostLike>;
}