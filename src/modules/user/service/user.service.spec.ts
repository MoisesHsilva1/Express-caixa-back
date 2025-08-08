import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

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
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('Should create user', async () => {
    const createdUser = await userService.create(mockUser);

    expect(createdUser.email).toBe(mockUser.email);
    expect(createdUser.name).toBe(mockUser.name);
  });
});
