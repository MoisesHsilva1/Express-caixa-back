import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { TenantService } from 'src/modules/tenant/service/tenant.service';
import { Tenant } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    @Inject('FIREBASE_ADMIN')
    private readonly firebaseApp: admin.app.App,
    @Inject(forwardRef(() => TenantService))
    private readonly tenantService: TenantService,
  ) {}

  async login(idToken: string): Promise<Tenant> {
    const decoded = await this.firebaseApp.auth().verifyIdToken(idToken);
    const id = decoded.uid;

    const tenant = await this.tenantService.findById(id);

    if (!tenant) {
      throw new UnauthorizedException('Tenant not found.');
    }

    return tenant;
  }
}
