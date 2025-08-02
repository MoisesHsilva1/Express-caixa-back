import { Module } from '@nestjs/common';
import { TransactionService } from './service/transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
