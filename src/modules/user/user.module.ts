import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
