import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/service/prisma.service';
import { Transaction } from '@prisma/client';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import type { ReportBalance } from '../interface/balanceMethod.interface';

@Injectable()
export class TransactionService {
  constructor(private readonly model: PrismaService) {}

  async create(data: CreateTransactionDto): Promise<Transaction> {
    return await this.model.transaction.create({
      data: {
        type: data.type,
        amount: data.amount,
        description: data.description,
      },
    });
  }

  async getTotalCashByType(strategy: ReportBalance): Promise<string> {
    return await strategy.execute();
  }

  async get(): Promise<Transaction[]> {
    return await this.model.transaction.findMany();
  }
}
