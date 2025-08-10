import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let transactionService: TransactionService;

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
      providers: [
        {
          provide: TransactionService,
          useValue: mockTransactionService,
        },
      ],
    }).compile();

    transactionService = module.get<TransactionService>(TransactionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(transactionService).toBeDefined();
  });

  it('Should create transaction', async () => {
    const createdTransaction = await transactionService.create(mockTransaction);

    expect(createdTransaction.description).toBe(mockTransaction.description);
    expect(createdTransaction.type).toBe(mockTransaction.type);
    expect(createdTransaction.amount).toBe(mockTransaction.amount);
  });

  it('Should findAll transactions', async () => {
    const transactions = await transactionService.get();

    expect(transactions).toEqual([mockTransaction]);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(transactionService.get).toHaveBeenCalled();
  });

  it('Should call create with preserved context', async () => {
    const executor = async (
      callback: (data: typeof mockTransaction) => Promise<object>,
    ) => {
      return await callback(mockTransaction);
    };

    const result = await executor((data) => transactionService.create(data));
    expect(result).toEqual(mockTransaction);
  });

  it('Should find report transaction', async () => {
    const reportTransaction = await transactionService.getTransactionsReport();

    expect(reportTransaction).toEqual(mockReportTransaction);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(transactionService.getTransactionsReport).toHaveBeenCalled();
  });
});
