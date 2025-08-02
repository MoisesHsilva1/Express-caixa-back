import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TransactionModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
