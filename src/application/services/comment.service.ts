import { TypeORMCommentRepository } from '@infrastructure/repositories/TypeORMComment.repository';
import { TypeORMPostRepository } from '@infrastructure/repositories/TypeORMPost.repository';
import { Comment } from '@domain/entities/comment';
import { CreateComment } from '@domain/useCases/comments/createComment';
import { DeleteComment } from '@domain/useCases/comments/deleteComment';
import { GetCommentById } from '@domain/useCases/comments/getCommentById';
import { ListComments } from '@domain/useCases/comments/listComments';
import { UpdateComment } from '@domain/useCases/comments/updateComment';
import { CreateCommentDto } from '@application/dtos/comments/createComment';
import { UpdateCommentDto } from '@application/dtos/comments/updateComment';

export class CommentService {
    private listComments: ListComments;
    private getCommentById: GetCommentById;
    private createComment: CreateComment;
    private updateComment: UpdateComment;
    private deleteComment: DeleteComment;

    constructor() {
        const commentRepository = new TypeORMCommentRepository();
        const postRepository = new TypeORMPostRepository();

        this.listComments = new ListComments(commentRepository);
        this.getCommentById = new GetCommentById(commentRepository);
        this.createComment = new CreateComment(
            commentRepository,
            postRepository
        );
        this.updateComment = new UpdateComment(commentRepository);
        this.deleteComment = new DeleteComment(commentRepository);
    }

    /**
     * Retrieves all comments from the repository.
     * @returns {Promise<Comment[]>} A promise that resolves to an array of Comment entities.
     */
    async findAll(): Promise<Comment[]> {
        return await this.listComments.execute();
    }

    /**
     * Retrieves a single comment by its ID.
     * @param {string} id - The ID of the comment to retrieve.
     * @returns {Promise<Comment>} A promise that resolves to the found Comment entity.
     */
    async findOne(id: string): Promise<Comment> {
        return await this.getCommentById.execute(id);
    }

    /**
     * Creates a new comment.
     * @param {CreateCommentDto} createCommentDto - Data Transfer Object containing comment details.
     * @returns {Promise<Comment>} A promise that resolves to the created Comment entity.
     */
    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        return await this.createComment.execute(createCommentDto);
    }

    /**
     * Updates an existing comment by its ID.
     * @param {string} id - The ID of the comment to update.
     * @param {UpdateCommentDto} updateCommentDto - Data Transfer Object containing updated comment details.
     * @returns {Promise<Comment>} A promise that resolves to the updated Comment entity.
     */
    async update(
        id: string,
        updateCommentDto: UpdateCommentDto
    ): Promise<Comment> {
        return await this.updateComment.execute(id, updateCommentDto);
    }

    /**
     * Deletes a comment by its ID.
     * @param {string} id - The ID of the comment to delete.
     * @returns {Promise<void>} A promise that resolves when the comment is successfully deleted.
     */
    async remove(id: string): Promise<void> {
        return await this.deleteComment.execute(id);
    }
}
