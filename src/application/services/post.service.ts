import { CreatePostDto } from '@application/dtos/posts/createPost';
import { UpdatePostDto } from '@application/dtos/posts/updatePost';
import { Post } from '@domain/entities/post';
import { CreatePost } from '@domain/useCases/posts/createPost';
import { DeletePost } from '@domain/useCases/posts/deletePost';
import { GetPostById } from '@domain/useCases/posts/getPostById';
import { ListPosts } from '@domain/useCases/posts/listPosts';
import { UpdatePost } from '@domain/useCases/posts/updatePost';
import { TypeORMPostRepository } from '@infrastructure/repositories/TypeORMPost.repository';
import { TypeORMUserRepository } from '@infrastructure/repositories/TypeORMUser.repository';

export class PostService {
    private readonly listPosts: ListPosts;
    private readonly getPostById: GetPostById;
    private readonly createPost: CreatePost;
    private readonly updatePost: UpdatePost;
    private readonly deletePost: DeletePost;

    constructor() {
        const postRepository = new TypeORMPostRepository();
        const userRepository = new TypeORMUserRepository();

        this.listPosts = new ListPosts(postRepository);
        this.getPostById = new GetPostById(postRepository);
        this.createPost = new CreatePost(postRepository, userRepository);
        this.updatePost = new UpdatePost(postRepository);
        this.deletePost = new DeletePost(postRepository);
    }

    /**
     * Retrieves all posts.
     * @returns {Promise<Post[]>} A promise that resolves with an array of posts.
     */
    async findAll(): Promise<Post[]> {
        return this.listPosts.execute();
    }

    /**
     * Retrieves a single post by its ID.
     * @param {string} id - The ID of the post to retrieve.
     * @returns {Promise<Post>} A promise that resolves with the found post.
     * @throws {Error} If the post is not found.
     */
    async findOne(id: string): Promise<Post> {
        const post = await this.getPostById.execute(id);

        if (!post) {
            throw new Error(`post with id ${id} not found`);
        }

        return post;
    }

    /**
     * Creates a new post.
     * @param {CreatePostDto} createPostDto - The data transfer object containing post details.
     * @returns {Promise<Post>} A promise that resolves with the created post.
     */
    async create(createPostDto: CreatePostDto): Promise<Post> {
        return this.createPost.execute(createPostDto);
    }

    /**
     * Updates an existing post.
     * @param {string} id - The ID of the post to update.
     * @param {UpdatePostDto} updatePostDto - The data transfer object containing the updated details.
     * @returns {Promise<Post>} A promise that resolves with the updated post.
     * @throws {Error} If the post is not found.
     */
    async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
        await this.findOne(id);
        return this.updatePost.execute(id, updatePostDto);
    }

    /**
     * Deletes a post by its ID.
     * @param {string} id - The ID of the post to delete.
     * @returns {Promise<void>} A promise that resolves when the post is deleted.
     * @throws {Error} If the post is not found.
     */
    async remove(id: string): Promise<void> {
        await this.findOne(id);
        return this.deletePost.execute(id);
    }
}
