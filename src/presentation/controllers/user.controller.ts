import 'reflect-metadata';
import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { UserService } from '@application/services/user.service';
import { CreateUserDto } from '@application/dtos/users/createUser.dto';
import { UpdateUserDto } from '@application/dtos/users/updateUser.dto';

@autoInjectable()
export class UserController {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    /**
     * Finds a user by ID.
     * @param {Request} req - The HTTP request object, containing the user ID in `params`.
     * @param {Response} res - The HTTP response object.
     * @returns {Promise<void>} A promise that resolves when the user data is sent as a response.
     */
    async findUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params as { id: string };

        const user = await this.userService.findOne(id);

        res.status(200).json(user);
    }

    /**
     * Retrieves all users.
     * @param {Request} _ - The HTTP request object (unused).
     * @param {Response} res - The HTTP response object.
     * @returns {Promise<void>} A promise that resolves when the user list is sent as a response.
     */
    async findAllUser(_: Request, res: Response): Promise<void> {
        const users = await this.userService.findAll();

        res.status(200).json(users);
    }

    /**
     * Creates a new user.
     * @param {Request} req - The HTTP request object, containing the user data in `body`.
     * @param {Response} res - The HTTP response object.
     * @returns {Promise<void>} A promise that resolves when the newly created user is sent as a response.
     */
    async createUser(req: Request, res: Response): Promise<void> {
        const createUserDto: CreateUserDto = req.body;

        const user = await this.userService.create(createUserDto);

        res.status(200).json(user);
    }

    /**
     * Updates an existing user.
     * @param {Request} req - The HTTP request object, containing the user ID in `params` and updated data in `body`.
     * @param {Response} res - The HTTP response object.
     * @returns {Promise<void>} A promise that resolves when the updated user data is sent as a response.
     */
    async updateUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params as { id: string };
        const updateUserDto: UpdateUserDto = req.body;

        const user = await this.userService.update(id, updateUserDto);

        res.status(201).json(user);
    }

    /**
     * Removes a user by ID.
     * @param {Request} req - The HTTP request object, containing the user ID in `params`.
     * @param {Response} res - The HTTP response object.
     * @returns {Promise<void>} A promise that resolves when the deletion result is sent as a response.
     */
    async removeUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params as { id: string };

        await this.userService.remove(id);

        res.status(200).json({ message: 'User deleted successfully' });
    }
}
