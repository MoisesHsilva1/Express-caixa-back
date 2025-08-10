import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionService } from './service/transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from '@prisma/client';
import { ReportTransactionDto } from './dto/report-transaction.dto';

@ApiTags('Transctions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Create transaction ' })
  @ApiResponse({ status: 201, description: 'Success' })
  async create(@Body() data: CreateTransactionDto) {
    return this.transactionService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get transactions ' })
  @ApiResponse({ status: 200, description: 'Sucess' })
  async get(): Promise<Transaction[]> {
    return this.transactionService.get();
  }

  @Get('transaction-report')
  @ApiOperation({ summary: 'Get report transaction' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getTotalAmountByType(): Promise<ReportTransactionDto> {
    return this.transactionService.getTransactionsReport();
  }
}
