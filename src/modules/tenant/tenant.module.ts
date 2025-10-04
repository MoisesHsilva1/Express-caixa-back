import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { TenantService } from './service/tenant.service';
import { TenantController } from './tenant.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [TenantController],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}
