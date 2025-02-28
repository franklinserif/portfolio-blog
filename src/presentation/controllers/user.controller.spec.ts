import request from 'supertest';
import express, { Application } from 'express';
import { UserController } from '@presentation/controllers/user.controller';
import { UserService } from '@application/services/user.service';
import { UpdateUserDto } from '@application/dtos/users/updateUser.dto';

jest.mock('@application/services/user.service');

describe('UserController', () => {
    let app: Application;
    let userController: UserController;
    let userService: jest.Mocked<UserService>;

    beforeAll(() => {
        app = express();
        app.use(express.json());

        userService = new UserService() as jest.Mocked<UserService>;
        userController = new UserController(userService);

        app.get('/users/:id', (req, res) => userController.findUser(req, res));
        app.get('/users', (req, res) => userController.findAllUser(req, res));
        app.post('/users', (req, res) => userController.createUser(req, res));
        app.put('/users/:id', (req, res) =>
            userController.updateUser(req, res)
        );
        app.delete('/users/:id', (req, res) =>
            userController.removeUser(req, res)
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /users/:id', () => {
        it('should return a user by ID', async () => {
            const mockUser = {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@gmail.com',
                password: '1234567',
                posts: []
            };
            userService.findOne.mockResolvedValue(mockUser);

            const response = await request(app).get('/users/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUser);
            expect(userService.findOne).toHaveBeenCalledWith('1');
        });
    });

    describe('GET /users', () => {
        it('should return all users', async () => {
            const mockUsers = [
                {
                    id: '1',
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'johndoe@gmail.com',
                    password: '1234567',
                    posts: []
                },
                {
                    id: '2',
                    firstName: 'Jane',
                    lastName: 'Doe',
                    email: 'janedoe@gmail.com',
                    password: '1234567',
                    posts: []
                }
            ];
            userService.findAll.mockResolvedValue(mockUsers);

            const response = await request(app).get('/users');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUsers);
            expect(userService.findAll).toHaveBeenCalled();
        });
    });

    describe('POST /users', () => {
        it('should create a new user', async () => {
            const createUserDto = {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@gmail.com',
                password: '1234567',
                posts: []
            };
            const mockUser = {
                ...createUserDto,
                posts: []
            };
            userService.create.mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/users')
                .send(createUserDto);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUser);
            expect(userService.create).toHaveBeenCalledWith(createUserDto);
        });
    });

    describe('PUT /users/:id', () => {
        it('should update an existing user', async () => {
            const updateUserDto: UpdateUserDto = { firstName: 'John Updated' };
            const mockUser = {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@gmail.com',
                password: '1234567',
                posts: []
            };
            userService.update.mockResolvedValue(mockUser);

            const response = await request(app)
                .put('/users/1')
                .send(updateUserDto);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockUser);
            expect(userService.update).toHaveBeenCalledWith('1', updateUserDto);
        });
    });

    describe('DELETE /users/:id', () => {
        it('should delete a user by ID', async () => {
            const deleteResult = { affected: 1 };
            userService.remove.mockResolvedValue();

            const response = await request(app).delete('/users/1');

            expect(response.status).toBe(201);
            expect(response.body).toEqual(deleteResult);
            expect(userService.remove).toHaveBeenCalledWith('1');
        });
    });
});
