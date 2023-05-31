import PostLike, { PostLikeCreationalAttributes } from "../models/PostLike.model";

export interface LikeRepository {
    deletePostLike(postLike: PostLikeCreationalAttributes): unknown;
    userLiked(postLike: PostLikeCreationalAttributes): Promise<boolean>;
    createPostLike: (postLike: PostLikeCreationalAttributes) => Promise<PostLike>;
}