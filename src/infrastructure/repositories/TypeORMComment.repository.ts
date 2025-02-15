import { Repository } from 'typeorm';
import { CommentRepository } from '@domain/repositories/comment.repository';
import { AppDataSource } from '@infrastructure/database/dataSource';
import { Comment } from '@infrastructure/entities/comment.entity';

export class TypeORMCommentRepository implements CommentRepository {
    private commentRepository: Repository<Comment>;

    constructor() {
        this.commentRepository = AppDataSource.getRepository(Comment);
    }

    /**
     * Retrieves all comments from the database.
     * @returns {Promise<Comment[]>} A promise that resolves with an array of comments.
     */
    async findAll(): Promise<Comment[]> {
        return await this.commentRepository.find();
    }

    /**
     * Finds a comment by its ID.
     * @param {string} id - The ID of the comment.
     * @returns {Promise<Comment>} A promise that resolves with the found comment.
     * @throws {Error} If no comment is found with the given ID.
     */
    async findOne(id: string): Promise<Comment> {
        const comment = await this.commentRepository.findOneBy({ id });

        if (!comment) {
            throw new Error('Comment not found');
        }

        return comment;
    }

    /**
     * Creates a new comment in the database.
     * @param {Omit<Comment, 'checkFieldsBeforeInsert'>} comment - The comment data to create.
     * @returns {Promise<Comment>} A promise that resolves with the created comment.
     */
    async create(
        comment: Omit<Comment, 'checkFieldsBeforeInsert'>
    ): Promise<Comment> {
        const newComment = this.commentRepository.create(comment);
        return await this.commentRepository.save(newComment);
    }

    /**
     * Updates an existing comment.
     * @param {string} id - The ID of the comment to update.
     * @param {Partial<Comment>} comment - The updated comment data.
     * @returns {Promise<Comment>} A promise that resolves with the updated comment.
     * @throws {Error} If the comment does not exist.
     */
    async update(id: string, comment: Partial<Comment>): Promise<Comment> {
        await this.findOne(id);
        await this.commentRepository.update(id, comment);
        return await this.findOne(id);
    }

    /**
     * Removes a comment from the database.
     * @param {string} id - The ID of the comment to remove.
     * @returns {Promise<void>} A promise that resolves when the comment is deleted.
     * @throws {Error} If the comment does not exist.
     */
    async remove(id: string): Promise<void> {
        await this.findOne(id);
        await this.commentRepository.delete(id);
    }
}
