import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReportTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  totalCashIn: number;

  @IsNumber()
  @IsNotEmpty()
  totalCashOut: number;

  @IsNumber()
  @IsNotEmpty()
  balance: number;
}
