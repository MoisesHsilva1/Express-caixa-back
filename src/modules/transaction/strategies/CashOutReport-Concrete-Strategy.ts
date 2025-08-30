import { PrismaService } from '../../../database/service/prisma.service';
import { ReportBalance } from '../interface/balanceMethod.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CashOutReportConcreteStrategy implements ReportBalance {
  constructor(private readonly model: PrismaService) {}

  async execute(): Promise<string> {
    const response = await this.model.transaction.groupBy({
      by: ['type'],
      where: { type: 'cashOut' },
      _sum: { amount: true },
    });

    const totalCashOut = response[0]?._sum?.amount ?? 0;

    return `totalCashOut: ${totalCashOut}`;
  }
}
