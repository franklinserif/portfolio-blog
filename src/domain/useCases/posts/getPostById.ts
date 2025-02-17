import { Post } from '@domain/entities/post';
import { PostRepository } from '@domain/repositories/post.repository';

export class GetPostById {
    constructor(private readonly postRepository: PostRepository) {}

    async execute(id: string): Promise<Post> {
        try {
            const post = Post.serializePost(
                await this.postRepository.findOne(id)
            );

            if (!post) {
                throw new Error('Post not found');
            }

            return post;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}
