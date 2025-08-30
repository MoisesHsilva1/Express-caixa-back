import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './service/transaction.service';
import { CashInReportConcreteStrategy } from './strategies/CashInReport-Concrete-Strategy';
import { CashOutReportConcreteStrategy } from './strategies/CashOutReport-Concrete-Strategy';

describe('TransactionController', () => {
  let transactionController: TransactionController;

  const mockTransaction = {
    id: 1,
    description: 'New investment',
    type: 'cashIn',
    amount: 100,
  };

  const mockReportTransactionByType = {
    totalCashIn: 600,
  };

  const mockTransactionService = {
    create: jest.fn().mockResolvedValue(mockTransaction),
    get: jest.fn().mockResolvedValue([mockTransaction]),
    getTotalCashByType: jest
      .fn()
      .mockResolvedValue(mockReportTransactionByType),
  };

  const mockCashInStrategy = {};
  const mockCashOutStrategy = {};

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

    const result = await transactionController.create(dto);

    expect(mockTransactionService.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockTransaction);
  });

  it('should call get and return all transactions', async () => {
    const result = await transactionController.get();

    expect(mockTransactionService.get).toHaveBeenCalled();
    expect(result).toEqual([mockTransaction]);
  });

  it('should call getTotalCashByType with cashIn strategy', async () => {
    const result = await transactionController.getTotalCashByType('cashIn');

    expect(mockTransactionService.getTotalCashByType).toHaveBeenCalledWith(
      mockCashInStrategy,
    );
    expect(result).toEqual(mockReportTransactionByType);
  });

  it('should call getTotalCashByType with cashOut strategy', async () => {
    const result = await transactionController.getTotalCashByType('cashOut');

    expect(mockTransactionService.getTotalCashByType).toHaveBeenCalledWith(
      mockCashOutStrategy,
    );
    expect(result).toEqual(mockReportTransactionByType);
  });

  it('should throw error if type is invalid', async () => {
    await expect(
      transactionController.getTotalCashByType('invalid'),
    ).rejects.toThrow('Tipo de transação inválido');
  });
});
