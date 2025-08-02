import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionService } from './service/transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

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
}
