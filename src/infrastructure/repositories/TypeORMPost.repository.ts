import { Repository } from 'typeorm';
import { Post } from '@infrastructure/entities/post.entity';
import { AppDataSource } from '@infrastructure/database/dataSource';
import { PostRepository } from '@domain/repositories/post.repository';

export class TypeORMPostRepository implements PostRepository {
    private repository: Repository<Post>;

    constructor() {
        this.repository = AppDataSource.getRepository(Post);
    }

    /**
     * Finds a post by its ID.
     * @param {string} id - The ID of the post.
     * @returns {Promise<Post>} The found post entity.
     */
    public async findOne(id: string): Promise<Post> {
        const post = await this.repository.findOneBy({ id });

        if (!post) {
            throw new Error('Post not found');
        }

        return post;
    }

    /**
     * Retrieves all posts.
     * @returns {Promise<Post[]>} An array of post entities.
     */
    public async findAll(): Promise<Post[]> {
        return await this.repository.find();
    }

    /**
     * Creates a new post.
     * @param {Post} post - The post entity to be saved.
     * @returns {Promise<Post>} The saved post entity.
     */
    public async create(post: Post): Promise<Post> {
        return await this.repository.save(post);
    }

    /**
     * Updates an existing post.
     * @param {string} id - The ID of the post to update.
     * @param {Partial<Post>} post - The partial post entity with updated values.
     * @returns {Promise<Post | null>} The updated post entity or null if not found.
     */
    public async update(id: string, post: Partial<Post>): Promise<Post> {
        await this.repository.update(id, post);
        return await this.findOne(id);
    }

    /**
     * Removes a post by its ID.
     * @param {string} id - The ID of the post to remove.
     * @returns {Promise<void>} A promise that resolves when the post is removed.
     */
    public async remove(id: string): Promise<void> {
        const post = await this.findOne(id);
        await this.repository.remove(post);
    }
}
