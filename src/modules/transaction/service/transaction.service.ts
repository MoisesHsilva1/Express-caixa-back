import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/service/prisma.service';
import { Transaction } from '@prisma/client';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import type { ReportBalance } from '../interface/balanceMethod.interface';
import { validateTenantId } from '../../../utils/validate-tenant-id';

@Injectable()
export class TransactionService {
  constructor(private readonly model: PrismaService) {}

  async create(
    data: CreateTransactionDto,
    tenantId: string,
  ): Promise<Transaction> {
    validateTenantId(tenantId);

    return await this.model.transaction.create({
      data: {
        tenant_id: tenantId,
        type: data.type,
        amount: data.amount,
        description: data.description,
      },
    });
  }

  async getTotalCashByType(
    strategy: ReportBalance,
    tenantId: string,
  ): Promise<number> {
    return await strategy.execute(tenantId);
  }

  async get(tenantId: string): Promise<Transaction[]> {
    validateTenantId(tenantId);
    return await this.model.transaction.findMany({
      where: { tenant_id: tenantId },
    });
  }
}
