import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionService } from './service/transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from '@prisma/client';

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

  @Get('total-by-type/:type')
  @ApiOperation({ summary: 'Get total amount of transactions by type' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getTotalAmountByType(@Param('type') type: string): Promise<number> {
    return this.transactionService.getTotalAmountByType(type);
  }
}
