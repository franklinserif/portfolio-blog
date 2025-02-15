import { UpdatePostDto } from '@application/dtos/posts/updatePost';
import { Post } from '@domain/entities/post';
import { PostRepository } from '@domain/repositories/post.repository';

export class UpdatePost {
    constructor(private readonly postRepository: PostRepository) {}

    async execute(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
        const post = Post.serializePost(
            await this.postRepository.update(id, {
                ...updatePostDto,
                comments: []
            })
        );

        return post;
    }
}
