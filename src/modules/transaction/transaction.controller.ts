import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionService } from './service/transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from '@prisma/client';
import { CashOutReportConcreteStrategy } from './strategies/CashOutReport-Concrete-Strategy';
import { CashInReportConcreteStrategy } from './strategies/CashInReport-Concrete-Strategy';
import type { ReportBalance } from './interface/balanceMethod.interface';
import { BalanceReportConcreteStrategy } from './strategies/BalanceReport-Concrete-Strategy';

@ApiTags('Transctions')
@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly cashInReportStrategy: CashInReportConcreteStrategy,
    private readonly cashOutReportStrategy: CashOutReportConcreteStrategy,
    private readonly balanceReportStrategy: BalanceReportConcreteStrategy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create transaction ' })
  @ApiResponse({ status: 201, description: 'Success' })
  async create(@Body() data: CreateTransactionDto) {
    return this.transactionService.create(data);
  }

  @Get('/:type')
  @ApiOperation({ summary: 'Get report transactions by type' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getTotalCashByType(@Param('type') type: string): Promise<number> {
    let strategy: ReportBalance | null = null;

    switch (type) {
      case 'cashIn':
        strategy = this.cashInReportStrategy;
        break;
      case 'cashOut':
        strategy = this.cashOutReportStrategy;
        break;
      case 'balance':
        strategy = this.balanceReportStrategy;
        break;
    }

    if (!strategy) {
      throw new Error('Tipo de transação inválido');
    }

    return this.transactionService.getTotalCashByType(strategy);
  }

  @Get()
  @ApiOperation({ summary: 'Get transactions ' })
  @ApiResponse({ status: 200, description: 'Sucess' })
  async get(): Promise<Transaction[]> {
    return this.transactionService.get();
  }
}
