import { Post } from '@domain/entities/post';
import { PostRepository } from '@domain/repositories/post.repository';
import { HttpException } from '@shared/errors/http.exception';

export class GetPostById {
    constructor(private readonly postRepository: PostRepository) {}

    async execute(id: string): Promise<Post> {
        try {
            const post = Post.serializePost(
                await this.postRepository.findOne(id)
            );

            if (!post) {
                throw new HttpException(404, 'post not found');
            }

            return post;
        } catch (error) {
            throw new HttpException(500, 'error getting post by id', error);
        }
    }
}
