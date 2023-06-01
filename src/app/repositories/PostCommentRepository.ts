import PostComment, { PostCommentCreationAttributes } from "../models/PostComment.model";

export interface PostCommentRepository {
    create(data: PostCommentCreationAttributes): Promise<PostComment>;
    getCommentById(id: string): Promise<PostComment | null>;
    update(id: string, data: PostCommentCreationAttributes): Promise<PostComment | null>;
    delete(id: string): Promise<PostComment | null>;
}