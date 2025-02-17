import { Post } from '@domain/entities/post';
import { PostRepository } from '@domain/repositories/post.repository';
import { HttpException } from '@shared/errors/http.exception';

export class ListPosts {
    constructor(private readonly postRepository: PostRepository) {}

    async execute(): Promise<Post[]> {
        try {
            const posts = Post.serializeAll(
                await this.postRepository.findAll()
            );

            return posts;
        } catch (error) {
            throw new HttpException(500, 'error gettings list of posts', error);
        }
    }
}
