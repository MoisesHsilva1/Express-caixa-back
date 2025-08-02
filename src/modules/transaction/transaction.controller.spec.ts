import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './service/transaction.service';

describe('TransactionController', () => {
  let transactionController: TransactionController;

  const mockTransaction = {
    description: 'New investment',
    type: 'cashIn',
    amount: 100,
  };

  const mockTransactionService = {
    create: jest.fn().mockResolvedValue(mockTransaction),
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

  it('should call create method of TransactionService and return a transaction', async () => {
    const result = await transactionController.create(mockTransaction);

    expect(mockTransactionService.create).toHaveBeenCalledWith(mockTransaction);
    expect(result).toEqual(mockTransaction);
  });
});
