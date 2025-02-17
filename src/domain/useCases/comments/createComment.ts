import { CreateCommentDto } from '@application/dtos/comments/createComment';
import { CommentRepository } from '@domain/repositories/comment.repository';
import { PostRepository } from '@domain/repositories/post.repository';
import { Comment } from '@domain/entities/comment';
import { ILogger } from '@shared/interfaces/logs';
import { Logger } from '@shared/utils/logger/logger';

export class CreateComment {
    private readonly logger: ILogger = new Logger(CreateComment.name);

    constructor(
        private readonly commentRepository: CommentRepository,
        private readonly postRepository: PostRepository
    ) {}

    async execute(createCommentDto: CreateCommentDto): Promise<Comment> {
        try {
            const post = await this.postRepository.findOne(
                createCommentDto.postId
            );

            if (!post) {
                throw new Error('Post not found');
            }

            const commentCreated = await this.commentRepository.create({
                ...createCommentDto,
                post
            });

            const comment = new Comment(commentCreated);
            this.logger.info(
                `comment with id ${commentCreated.id} was created`
            );

            return comment;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}
