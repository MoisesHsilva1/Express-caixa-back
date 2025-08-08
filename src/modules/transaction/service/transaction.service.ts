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
}
