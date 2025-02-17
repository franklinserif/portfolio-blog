import { CreatePostDto } from '@application/dtos/posts/createPost';
import { ILogger } from '@shared/interfaces/logs';
import { Logger } from '@shared/utils/logger/logger';
import { UserRepository } from '@domain/repositories/user.repository';
import { TagRepository } from '@domain/repositories/tag.repository';
import { PostRepository } from '@domain/repositories/post.repository';
import { Post as TypeORMPost } from '@infrastructure/entities/post.entity';
import { User } from '@domain/entities/user';
import { Post } from '@domain/entities/post';

export class CreatePost {
    private readonly logger: ILogger = new Logger(CreatePost.name);

    constructor(
        private readonly postRepository: PostRepository,
        private readonly userRepository: UserRepository,
        private readonly tagRepository: TagRepository
    ) {}

    async execute(createPostDto: CreatePostDto): Promise<Post> {
        try {
            const user = await this.userRepository.findOne(
                createPostDto.userId
            );

            const tags = await this.tagRepository.findManyByIds(
                createPostDto.tagsId
            );

            const post = new Post({
                id: createPostDto.id,
                title: createPostDto.title,
                content: createPostDto.content,
                urlPath: createPostDto.urlPath,
                comments: [],
                tags,
                user: User.serializeUser(user)
            }) as TypeORMPost;

            const createdPost = await this.postRepository.create(post);
            this.logger.info(`post with id ${createdPost.id} was created`);

            return Post.serializePost(createdPost);
        } catch (error) {
            throw new Error(`something went wrong creating the post ${error}`);
        }
    }
}
