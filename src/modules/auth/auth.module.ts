import * as admin from 'firebase-admin';
import { forwardRef } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { TenantModule } from '../tenant/tenant.module';

@Global()
@Module({
  imports: [PrismaModule, forwardRef(() => TenantModule)],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: async () => {
        const app = admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(
              /\\n/g,
              '\n',
            ) as string,
          }),
        });
        return app;
      },
    },
  ],
  exports: ['FIREBASE_ADMIN', AuthService], 
})
export class AuthModule {}
