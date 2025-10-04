import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './service/transaction.service';
import { CashInReportConcreteStrategy } from './strategies/CashInReport-Concrete-Strategy';
import { CashOutReportConcreteStrategy } from './strategies/CashOutReport-Concrete-Strategy';
import { BalanceReportConcreteStrategy } from './strategies/BalanceReport-Concrete-Strategy';

describe('TransactionController', () => {
  let transactionController: TransactionController;

  const mockTransaction = {
    id: 1,
    description: 'New investment',
    type: 'cashIn',
    amount: 100,
  };

  const mockReportTransactionByType = 600;

  const mockTransactionService = {
    create: jest.fn().mockResolvedValue(mockTransaction),
    get: jest.fn().mockResolvedValue([mockTransaction]),
    getTotalCashByType: jest.fn().mockResolvedValue(mockReportTransactionByType),
  };

  const mockCashInStrategy = {};
  const mockCashOutStrategy = {};
  const mockBalanceStrategy = {};

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: mockTransactionService,
        },
        {
          provide: CashInReportConcreteStrategy,
          useValue: mockCashInStrategy,
        },
        {
          provide: CashOutReportConcreteStrategy,
          useValue: mockCashOutStrategy,
        },
        {
          provide: BalanceReportConcreteStrategy,
          useValue: mockBalanceStrategy,
        },
      ],
    }).compile();

    transactionController = module.get<TransactionController>(
      TransactionController,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(transactionController).toBeDefined();
  });

  it('should call create and return created transaction', async () => {
    const dto = {
      description: 'New investment',
      type: 'cashIn',
      amount: 100,
    };
    const mockReq = { tenantId: 'tenant-123' } as any;
    const result = await transactionController.create(dto, mockReq);
    expect(mockTransactionService.create).toHaveBeenCalledWith(
      dto,
      'tenant-123',
    );
    expect(result).toEqual(mockTransaction);
  });

  it('should call get and return all transactions', async () => {
    const mockReq = { tenantId: 'tenant-123' } as any;
    const result = await transactionController.get(mockReq);
    expect(mockTransactionService.get).toHaveBeenCalled();
    expect(result).toEqual([mockTransaction]);
  });

  it('should call getTotalCashByType with cashIn strategy', async () => {
    const mockReq = { tenantId: 'tenant-123' } as any;
    const result = await transactionController.getTotalCashByType('cashIn', mockReq);
    expect(mockTransactionService.getTotalCashByType).toHaveBeenCalledWith(mockCashInStrategy, 'tenant-123');
    expect(result).toBe(mockReportTransactionByType);
  });

  it('should call getTotalCashByType with cashOut strategy', async () => {
    const mockReq = { tenantId: 'tenant-123' } as any;
    const result = await transactionController.getTotalCashByType('cashOut', mockReq);
    expect(mockTransactionService.getTotalCashByType).toHaveBeenCalledWith(mockCashOutStrategy, 'tenant-123');
    expect(result).toBe(mockReportTransactionByType);
  });

  it('should call getTotalCashByType with balance strategy', async () => {
    const mockReq = { tenantId: 'tenant-123' } as any;
    const result = await transactionController.getTotalCashByType('balance', mockReq);
    expect(mockTransactionService.getTotalCashByType).toHaveBeenCalledWith(mockBalanceStrategy, 'tenant-123');
    expect(result).toBe(mockReportTransactionByType);
  });

  it('should throw error if type is invalid', async () => {
    const mockReq = { tenantId: 'tenant-123' } as any;
    await expect(transactionController.getTotalCashByType('invalid', mockReq)).rejects.toThrow('Type invalid transaction');
  });
});
