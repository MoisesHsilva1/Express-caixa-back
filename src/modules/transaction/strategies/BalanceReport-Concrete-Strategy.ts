import { Injectable } from '@nestjs/common';
import { ReportBalance } from '../interface/balanceMethod.interface';
import { CashInReportConcreteStrategy } from './CashInReport-Concrete-Strategy';
import { CashOutReportConcreteStrategy } from './CashOutReport-Concrete-Strategy';

@Injectable()
export class BalanceReportConcreteStrategy implements ReportBalance {
  constructor(
    private readonly cashInStrategy: CashInReportConcreteStrategy,
    private readonly cashOutStrategy: CashOutReportConcreteStrategy,
  ) {}

  async execute(tenantId: string): Promise<number> {
    const cashIn = await this.cashInStrategy.execute(tenantId);
    const cashOut = await this.cashOutStrategy.execute(tenantId);

    return cashIn - cashOut;
  }
}
