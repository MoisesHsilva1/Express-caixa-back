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

  async execute(): Promise<number> {
    const cashIn = await this.cashInStrategy.execute();
    const cashOut = await this.cashOutStrategy.execute();

    return cashIn - cashOut;
  }
}
