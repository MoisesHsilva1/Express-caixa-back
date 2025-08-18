import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/service/prisma.service';
import { Transaction } from '@prisma/client';
import { ReportTransactionDto } from '../dto/report-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly model: PrismaService) {}

  async create(data: {
    description: string;
    type: string;
    amount: number;
  }): Promise<Transaction> {
    return this.model.transaction.create({
      data,
    });
  }

  async get(): Promise<Transaction[]> {
    return this.model.transaction.findMany();
  }

  async getTransactionsReport(): Promise<ReportTransactionDto> {
    const results = await this.model.transaction.groupBy({
      by: ['type'],
      _sum: { amount: true },
    });

    let totalCashIn = 0;
    let totalCashOut = 0;

    for (const item of results) {
      if (item.type === 'cashIn') {
        totalCashIn = item._sum.amount ?? 0;
      }
      if (item.type === 'cashOut') {
        totalCashOut = item._sum.amount ?? 0;
      }
    }

    return {
      totalCashIn,
      totalCashOut,
      balance: totalCashIn - totalCashOut,
    };
  }
}
