import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { TenantMiddleware } from './commom/middleware/tenant.middleware';
import { PrismaModule } from './database/prisma.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import { TenantModule } from './modules/tenant/tenant.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './commom/guard/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TransactionModule,
    TenantModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [{
    provide: 'APP_GUARD',
    useClass: AuthGuard,
  }],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
