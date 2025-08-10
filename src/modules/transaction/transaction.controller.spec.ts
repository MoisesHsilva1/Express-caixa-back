import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './service/transaction.service';

describe('TransactionController', () => {
  let transactionController: TransactionController;

  const mockTransaction = {
    id: 1,
    description: 'New investment',
    type: 'cashIn',
    amount: 100,
  };

  const mockReportTransaction = {
    totalCashIn: 100,
    totalCashOut: 100,
    balance: 100,
  };

  const mockTransactionService = {
    create: jest.fn().mockResolvedValue(mockTransaction),
    get: jest.fn().mockResolvedValue([mockTransaction]),
    getTransactionsReport: jest.fn().mockResolvedValue(mockReportTransaction),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: mockTransactionService,
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

  it('should return total amount of transactions by type', async () => {
    const result = await transactionController.getTotalAmountByType();

    expect(mockTransactionService.getTransactionsReport).toHaveBeenCalled();
    expect(result).toEqual(mockReportTransaction);
  });
});
