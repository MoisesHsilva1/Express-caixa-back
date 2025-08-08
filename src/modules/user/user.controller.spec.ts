import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './service/user.service';

describe('UserController', () => {
  let userController: UserController;

  const mockUser = {
    email: 'user@example.com',
    name: 'John Doe',
    password: 'securePassword123',
  };

  const mockUserService = {
    create: jest.fn().mockResolvedValue(mockUser),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should call create method of UserService and return a user', async () => {
    const result = await userController.create(mockUser);

    expect(mockUserService.create).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });
});
