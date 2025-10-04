import { PrismaService } from '../../../database/service/prisma.service';
import { ReportBalance } from '../interface/balanceMethod.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CashInReportConcreteStrategy implements ReportBalance {
  constructor(private readonly model: PrismaService) {}

  async execute(tenantId: string): Promise<number> {
    const total = await this.model.transaction.aggregate({
      _sum: { amount: true },
      where: { type: 'cashIn', tenant_id: tenantId },
    });
    const totalCashIn = total._sum.amount ?? 0;

    return totalCashIn;
  }
}
