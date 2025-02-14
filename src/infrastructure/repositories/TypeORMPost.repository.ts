import { Repository } from 'typeorm';
import { Post } from '@infrastructure/entities/post.entity';
import { AppDataSource } from '@infrastructure/database/dataSource';

export class TypeORMPostRepository {
    private repository: Repository<Post>;

    constructor() {
        this.repository = AppDataSource.getRepository(Post);
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
     * Finds a post by its ID.
     * @param {string} id - The ID of the post.
     * @returns {Promise<Post | null>} The found post entity or null if not found.
     */
    public async findById(id: string): Promise<Post | null> {
        return await this.repository.findOneBy({ id });
    }

    /**
     * Retrieves all posts.
     * @returns {Promise<Post[]>} An array of post entities.
     */
    public async findAll(): Promise<Post[]> {
        return await this.repository.find();
    }

    /**
     * Updates an existing post.
     * @param {string} id - The ID of the post to update.
     * @param {Partial<Post>} post - The partial post entity with updated values.
     * @returns {Promise<Post | null>} The updated post entity or null if not found.
     */
    public async update(id: string, post: Partial<Post>): Promise<Post | null> {
        await this.repository.update(id, post);
        return this.findById(id);
    }

    /**
     * Deletes a post by its ID.
     * @param {string} id - The ID of the post to delete.
     * @returns {Promise<void>} A promise that resolves when the post is deleted.
     */
    public async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
