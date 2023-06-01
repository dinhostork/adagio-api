import PostComment, { PostCommentCreationAttributes } from "../models/PostComment.model";

export interface PostCommentRepository {
    create(data: PostCommentCreationAttributes): Promise<PostComment>;
}