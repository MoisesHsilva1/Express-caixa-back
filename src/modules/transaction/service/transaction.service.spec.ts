import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { PrismaService } from '../../../database/service/prisma.service';
import type { ReportBalance } from '../interface/balanceMethod.interface';

describe('TransactionService', () => {
  let transactionService: TransactionService;
  let prismaService: PrismaService;

  const mockTransaction = {
    id: 1,
    user_id: 1,
    description: 'New investment',
    type: 'cashIn',
    amount: 100,
  };

  const mockTransactions = [mockTransaction];

  const mockReportTransaction = {
    totalCashIn: 100,
    totalCashOut: 50,
    balance: 50,
  };

  const mockPrismaService = {
    transaction: {
      create: jest.fn().mockResolvedValue(mockTransaction),
      findMany: jest.fn().mockResolvedValue(mockTransactions),
    },
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    transactionService = module.get<TransactionService>(TransactionService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(transactionService).toBeDefined();
  });

  it('Should create transaction', async () => {
    const dto = {
      description: 'New investment',
      type: 'cashIn',
      amount: 100,
    };

    const createdTransaction = await transactionService.create(dto);

    expect(prismaService.transaction.create).toHaveBeenCalledWith({
      data: {
        type: dto.type,
        amount: dto.amount,
        description: dto.description,
      },
    });
    expect(createdTransaction).toEqual(mockTransaction);
  });

  it('Should return all transactions', async () => {
    const transactions = await transactionService.get();

    expect(prismaService.transaction.findMany).toHaveBeenCalled();
    expect(transactions).toEqual(mockTransactions);
  });

  it('Should execute strategy for getTotalCashByType', async () => {
    const mockStrategy: ReportBalance = {
      execute: jest.fn().mockResolvedValue(mockReportTransaction),
    };

    const result = await transactionService.getTotalCashByType(mockStrategy);

    expect(mockStrategy.execute).toHaveBeenCalled();
    expect(result).toEqual(mockReportTransaction);
  });
});
