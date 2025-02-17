import { UpdatePostDto } from '@application/dtos/posts/updatePost';
import { Post } from '@domain/entities/post';
import { CommentRepository } from '@domain/repositories/comment.repository';
import { PostRepository } from '@domain/repositories/post.repository';
import { TagRepository } from '@domain/repositories/tag.repository';
import { UserRepository } from '@domain/repositories/user.repository';
import { ILogger } from '@shared/interfaces/logs';
import { Logger } from '@shared/utils/logger/logger';

export class UpdatePost {
    private readonly logger: ILogger = new Logger(UpdatePost.name);

    constructor(
        private readonly postRepository: PostRepository,
        private readonly userRepository: UserRepository,
        private readonly tagRepository: TagRepository,
        private readonly commentRepository: CommentRepository
    ) {}

    async execute(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
        try {
            let post = await this.postRepository.findOne(id);

            if (!post) {
                throw new Error(`post with id ${id} not found`);
            }

            if (updatePostDto.userId) {
                post.user = await this.userRepository.findOne(
                    updatePostDto.userId
                );

                if (!post.user) {
                    throw new Error(
                        `user with id ${updatePostDto.userId} not found`
                    );
                }
            }

            if (updatePostDto.tagsId) {
                post.tags = await this.tagRepository.findManyByIds(
                    updatePostDto.tagsId
                );
            }

            if (updatePostDto.commentsId) {
                post.comments = await this.commentRepository.findManyByIds(
                    updatePostDto.commentsId
                );
            }

            post = await this.postRepository.update(id, {
                ...post,
                ...updatePostDto,
                comments: post.comments,
                tags: post.tags,
                user: post.user
            });

            const serializePost = Post.serializePost(post);
            this.logger.info(`post with id ${id} was updated`);

            return serializePost;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}
