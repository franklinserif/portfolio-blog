import { autoInjectable } from 'tsyringe';
import { Request, Response } from 'express';
import { CommentService } from '@application/services/comment.service';
import { CreateCommentDto } from '@application/dtos/comments/createComment';
import { UpdateCommentDto } from '@application/dtos/comments/updateComment';

@autoInjectable()
export class CommentController {
    private readonly commentService: CommentService;

    constructor(commentService: CommentService) {
        this.commentService = commentService;
    }

    /**
     * Retrieves all comments.
     * @param {Request} _ - The request object (unused).
     * @param {Response} res - The response object.
     */
    async findAllComment(_: Request, res: Response): Promise<void> {
        const comments = await this.commentService.findAll();
        res.status(200).json(comments);
    }

    /**
     * Retrieves a comment by its ID.
     * @param {Request} req - The request object containing the comment ID.
     * @param {Response} res - The response object.
     */
    async findComment(req: Request, res: Response): Promise<void> {
        const { id } = req.params as { id: string };

        const comment = await this.commentService.findOne(id);
        res.status(200).json(comment);
    }

    /**
     * Creates a new comment.
     * @param {Request} req - The request object containing the comment data.
     * @param {Response} res - The response object.
     */
    async createComment(req: Request, res: Response): Promise<void> {
        const createCommentDto: CreateCommentDto = req.body;

        const comment = await this.commentService.create(createCommentDto);
        res.status(201).json(comment);
    }

    /**
     * Updates an existing comment by its ID.
     * @param {Request} req - The request object containing the comment ID and updated data.
     * @param {Response} res - The response object.
     */
    async updateComment(req: Request, res: Response): Promise<void> {
        const { id } = req.params as { id: string };
        const updateCommentDto: UpdateCommentDto = req.body;

        const comment = this.commentService.update(id, updateCommentDto);
        res.status(200).json(comment);
    }

    /**
     * Deletes a comment by its ID.
     * @param {Request} req - The request object containing the comment ID.
     * @param {Response} res - The response object.
     */
    async removeComment(req: Request, res: Response): Promise<void> {
        const { id } = req.params as { id: string };

        await this.commentService.remove(id);
        res.status(200).json({ message: 'Comment deleted successfully' });
    }
}
