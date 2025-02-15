import { CreatePostDto } from '@application/dtos/posts/createPost';
import { Post } from '@domain/entities/post';
import { Post as TypeORMPost } from '@infrastructure/entities/post.entity';
import { PostRepository } from '@domain/repositories/post.repository';
import { ILogger } from '@shared/interfaces/logs';
import { Logger } from '@shared/utils/logger/logger';

export class CreatePost {
    private readonly logger: ILogger = new Logger(CreatePost.name);

    constructor(private postRepository: PostRepository) {}

    async execute(createPostDto: CreatePostDto): Promise<Post> {
        try {
            const post = new Post({
                ...createPostDto,
                comments: []
            }) as TypeORMPost;

            return this.postRepository.create(post);
        } catch (error) {
            this.logger.error(
                `something went wrong creating the post ${error}`
            );
            throw new Error(`something went wrong creating the post ${error}`);
        }
    }
}
