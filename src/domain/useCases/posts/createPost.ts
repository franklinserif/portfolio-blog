import { CreatePostDto } from '@application/dtos/posts/createPost';
import { Post } from '@domain/entities/post';
import { Post as TypeORMPost } from '@infrastructure/entities/post.entity';
import { PostRepository } from '@domain/repositories/post.repository';
import { ILogger } from '@shared/interfaces/logs';
import { Logger } from '@shared/utils/logger/logger';
import { UserRepository } from '@domain/repositories/user.repository';

export class CreatePost {
    private readonly logger: ILogger = new Logger(CreatePost.name);

    constructor(
        private readonly postRepository: PostRepository,
        private readonly userRepository: UserRepository
    ) {}

    async execute(createPostDto: CreatePostDto): Promise<Post> {
        try {
            const user = await this.userRepository.findOne(
                createPostDto.userId
            );

            const post = new Post({
                id: createPostDto.id,
                title: createPostDto.title,
                content: createPostDto.content,
                urlPath: createPostDto.urlPath,
                user,
                comments: [],
                tags: []
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
