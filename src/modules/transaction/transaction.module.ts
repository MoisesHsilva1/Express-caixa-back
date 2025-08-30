import { Module } from '@nestjs/common';
import { TransactionService } from './service/transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { CashInReportConcreteStrategy } from './strategies/CashInReport-Concrete-Strategy';
import { CashOutReportConcreteStrategy } from './strategies/CashOutReport-Concrete-Strategy';

@Module({
  imports: [PrismaModule],
  providers: [
    TransactionService,
    CashInReportConcreteStrategy,
    CashOutReportConcreteStrategy,
  ],
  controllers: [TransactionController],
})
export class TransactionModule {}
