import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/commom/guard/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionService } from './service/transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from '@prisma/client';
import { CashOutReportConcreteStrategy } from './strategies/CashOutReport-Concrete-Strategy';
import { CashInReportConcreteStrategy } from './strategies/CashInReport-Concrete-Strategy';
import type { ReportBalance } from './interface/balanceMethod.interface';
import { BalanceReportConcreteStrategy } from './strategies/BalanceReport-Concrete-Strategy';
import type { Request } from 'express';

@ApiTags('Transactions')
@UseGuards(AuthGuard)
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
  async create(
    @Body() data: CreateTransactionDto,
    @Req() req: Request,
  ): Promise<Transaction> {
    const tenantId = req['tenantId'];
    return this.transactionService.create(data, tenantId);
  }

  @Get('/:type')
  @ApiOperation({ summary: 'Get report transactions by type' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getTotalCashByType(
    @Param('type') type: string,
    @Req() req: Request,
  ): Promise<number> {
    const tenantId = req['tenantId'];
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
      throw new Error('Type invalid transaction');
    }

    return this.transactionService.getTotalCashByType(strategy, tenantId);
  }

  @Get()
  @ApiOperation({ summary: 'Get transactions ' })
  @ApiResponse({ status: 200, description: 'Sucess' })
  async get(@Req() req: Request): Promise<Transaction[]> {
    const tenantId = req['tenantId'];
    return this.transactionService.get(tenantId);
  }
}
