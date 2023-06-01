import {  Response } from "express";
import { PostCommentService } from "../services/PostComment.service";
import { ProtectedRequest } from "../interfaces/protectedRequest";


export class PostCommentController {
    constructor(private readonly postCommentService: PostCommentService) { }
    async create(req: ProtectedRequest, res: Response) {
        const { postId } = req.params;
        const { userId } = req;
        const { text } = req.body;

        const payload = {
            text,
            post_id: postId,
            owner_id: userId!
        }

        const comment = await this.postCommentService.create(payload);

        return res.status(200).json(comment);
    }
}