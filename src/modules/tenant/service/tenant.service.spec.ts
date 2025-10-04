import { Test, TestingModule } from '@nestjs/testing';
import { TenantService } from './tenant.service';
import { PrismaService } from '../../../database/service/prisma.service';
import * as admin from 'firebase-admin';

describe('TenantService', () => {
  let tenantService: TenantService;
  let prismaService: PrismaService;
  let firebaseApp: any;

  const mockTenant = {
    id: 'tenant123',
    name: 'Tenant Name',
    email: 'tenant@example.com',
  };

  const mockCreateTenantDto = {
    id: 'tenant123',
    name: 'Tenant Name',
    email: 'tenant@example.com',
    password: 'securePassword123',
  };

  const mockFirebaseUser = {
    uid: 'tenant123',
  };

  const mockPrismaService = {
    tenant: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockFirebaseAuth = {
    createUser: jest.fn(),
  };

  const mockFirebaseApp = {
    auth: jest.fn(() => mockFirebaseAuth),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TenantService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: 'FIREBASE_ADMIN',
          useValue: mockFirebaseApp,
        },
      ],
    }).compile();

    tenantService = module.get<TenantService>(TenantService);
    prismaService = module.get<PrismaService>(PrismaService);
    firebaseApp = module.get('FIREBASE_ADMIN');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(tenantService).toBeDefined();
  });

  it('should create tenant when email does not exist', async () => {
    mockPrismaService.tenant.findUnique.mockResolvedValue(null);
    mockFirebaseAuth.createUser.mockResolvedValue(mockFirebaseUser);
    mockPrismaService.tenant.create.mockResolvedValue(mockTenant);

    const createdTenant = await tenantService.create(mockCreateTenantDto);
    expect(mockPrismaService.tenant.findUnique).toHaveBeenCalledWith({
      where: { email: mockCreateTenantDto.email },
    });
    expect(mockFirebaseAuth.createUser).toHaveBeenCalledWith({
      displayName: mockCreateTenantDto.name,
      email: mockCreateTenantDto.email,
      password: mockCreateTenantDto.password,
    });
    expect(mockPrismaService.tenant.create).toHaveBeenCalledWith({
      data: {
        id: mockFirebaseUser.uid,
        name: mockCreateTenantDto.name,
        email: mockCreateTenantDto.email,
      },
    });
    expect(createdTenant).toEqual(mockTenant);
  });

  it('should throw error if tenant with email already exists', async () => {
    mockPrismaService.tenant.findUnique.mockResolvedValue(mockTenant);
    await expect(tenantService.create(mockCreateTenantDto)).rejects.toThrow(
      'Tenant with this email already exists',
    );
    expect(mockPrismaService.tenant.findUnique).toHaveBeenCalledWith({
      where: { email: mockCreateTenantDto.email },
    });
  });

  it('should find tenant by id', async () => {
    mockPrismaService.tenant.findUnique.mockResolvedValue(mockTenant);
    const foundTenant = await tenantService.findById(mockTenant.id);
    expect(mockPrismaService.tenant.findUnique).toHaveBeenCalledWith({
      where: { id: mockTenant.id },
    });
    expect(foundTenant).toEqual(mockTenant);
  });
});
