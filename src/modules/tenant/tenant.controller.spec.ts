import { Test, TestingModule } from '@nestjs/testing';
import { TenantController } from './tenant.controller';
import { TenantService } from './service/tenant.service';

describe('TenantController', () => {
  let tenantController: TenantController;

  const mockTenant = {
    id: 'tenant-id',
    name: 'Tenant Name',
    email: 'tenant@example.com',
    password: 'securePassword123',
    balance: 1000,
  };

  const mockTenantService = {
    create: jest.fn().mockResolvedValue(mockTenant),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenantController],
      providers: [
        {
          provide: TenantService,
          useValue: mockTenantService,
        },
      ],
    }).compile();

    tenantController = module.get<TenantController>(TenantController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(tenantController).toBeDefined();
  });

  it('should call create method of TenantService and return a tenant', async () => {
    const result = await tenantController.create(mockTenant);

    expect(mockTenantService.create).toHaveBeenCalledWith(mockTenant);
    expect(result).toEqual(mockTenant);
  });
});
