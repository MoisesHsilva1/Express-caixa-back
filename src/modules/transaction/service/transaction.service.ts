import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/service/prisma.service';
import { Transaction } from '@prisma/client';

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

  async getTotalAmountByType(typeTransaction: string): Promise<number> {
    const transactionsCashIn = await this.model.transaction.findMany({
      where: {
        type: typeTransaction,
      },
      select: {
        amount: true,
      },
    });

    const total = transactionsCashIn.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );

    return total;
  }

}
