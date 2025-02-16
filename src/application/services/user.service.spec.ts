import { UserService } from './user.service';
import { TypeORMUserRepository } from '@infrastructure/repositories/TypeORMUser.repository';
import { User } from '@infrastructure/entities/user.entity';
import { CreateUserDto } from '@application/dtos/users/createUser.dto';
import { UpdateUserDto } from '@application/dtos/users/updateUser.dto';
import { DeleteResult } from 'typeorm';

interface MockUserRepository {
    findAll: jest.Mock<Promise<User[]>>;
    findById: jest.Mock<Promise<User | null>>;
    create: jest.Mock<Promise<User>>;
    update: jest.Mock<Promise<User>>;
    delete: jest.Mock<Promise<DeleteResult>>;
}

jest.mock('@infrastructure/repositories/TypeORMUser.repository', () => ({
    TypeORMUserRepository: jest.fn().mockImplementation(() => ({
        findAll: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }))
}));

describe('UserService', () => {
    let userService: UserService;
    let mockUserRepository: MockUserRepository;

    beforeEach(() => {
        mockUserRepository =
            new TypeORMUserRepository() as unknown as MockUserRepository;
        userService = new UserService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const mockUsers: Omit<User, 'checkFieldsBeforeInsert'>[] = [
                {
                    id: '1',
                    firstName: 'John',
                    lastName: 'Doe',
                    password: '1234567',
                    email: 'john@example.com',
                    posts: []
                },
                {
                    id: '2',
                    firstName: 'Jane',
                    lastName: 'Doe',
                    password: '1234567',
                    email: 'jane@example.com',
                    posts: []
                }
            ];

            mockUserRepository.findAll.mockResolvedValue(mockUsers as User[]);

            const result = await userService.findAll();

            expect(result).toEqual(mockUsers);
            expect(mockUserRepository.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a user if found', async () => {
            const mockUser: Omit<User, 'checkFieldsBeforeInsert'> = {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                password: '1234567',
                email: 'john@example.com',
                posts: []
            };

            mockUserRepository.findById.mockResolvedValue(mockUser as User);

            const result = await userService.findOne('1');

            expect(result).toEqual(mockUser);
            expect(mockUserRepository.findById).toHaveBeenCalledWith('1');
        });

        it('should throw an error if user is not found', async () => {
            mockUserRepository.findById.mockResolvedValue(null);

            await expect(userService.findOne('1')).rejects.toThrow(
                'user with id 1 not found'
            );
            expect(mockUserRepository.findById).toHaveBeenCalledWith('1');
        });
    });

    describe('create', () => {
        it('should create and return a new user', async () => {
            const createUserDto: CreateUserDto = {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                password: '1234567',
                email: 'john@example.com'
            };
            const mockUser: Omit<User, 'checkFieldsBeforeInsert'> =
                createUserDto;

            mockUserRepository.create.mockResolvedValue(mockUser as User);

            const result = await userService.create(createUserDto);

            expect(result).toEqual(mockUser);
            expect(mockUserRepository.create).toHaveBeenCalledWith(
                createUserDto
            );
        });
    });

    describe('update', () => {
        it('should update and return the updated user', async () => {
            const updateUserDto: UpdateUserDto = { firstName: 'John Updated' };
            const mockUser: Omit<User, 'checkFieldsBeforeInsert'> = {
                id: '1',
                firstName: 'John Updated',
                lastName: 'Doe',
                password: '1234567',
                email: 'john@example.com'
            };

            mockUserRepository.update.mockResolvedValue(mockUser as User);

            const result = await userService.update('1', updateUserDto);

            expect(result).toEqual(mockUser);
            expect(mockUserRepository.update).toHaveBeenCalledWith(
                '1',
                updateUserDto
            );
        });

        it('should throw an error if user to update is not found', async () => {
            mockUserRepository.findById.mockResolvedValue(null);

            await expect(
                userService.update('1', {} as UpdateUserDto)
            ).rejects.toThrow('user with id 1 not found');
            expect(mockUserRepository.findById).toHaveBeenCalledWith('1');
        });
    });

    describe('remove', () => {
        it('should delete a user and return the delete result', async () => {
            const mockUser: Omit<User, 'checkFieldsBeforeInsert'> = {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                password: '1234567',
                email: 'john@example.com',
                posts: []
            };

            mockUserRepository.findById.mockResolvedValue(mockUser as User);

            await userService.remove('1');

            expect(mockUserRepository.delete).toHaveBeenCalledWith('1');
        });
    });
});
