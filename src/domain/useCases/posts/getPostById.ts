import { Post } from '@domain/entities/post';
import { PostRepository } from '@domain/repositories/post.repository';

export class GetPostById {
    constructor(private readonly postRepository: PostRepository) {}

    async execute(id: string): Promise<Post> {
        const post = Post.serializePost(await this.postRepository.findOne(id));

        return post;
    }
}
