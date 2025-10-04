import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/service/prisma.service';
import { Tenant } from '@prisma/client';
import * as admin from 'firebase-admin';
import { CreateTenantDto } from '../dto/create-tenant.dto';

@Injectable()
export class TenantService {
  constructor(
    private readonly model: PrismaService,
    @Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App,
  ) {}

  async findById(id: string): Promise<Tenant | null> {
    return await this.model.tenant.findUnique({ where: { id } });
  }

  async create(userData: CreateTenantDto): Promise<Tenant> {
    const existingTenant = await this.model.tenant.findUnique({
      where: { email: userData.email },
    });

    if (existingTenant) {
      throw new Error('Tenant with this email already exists');
    }

    const fireBaseUser = await this.firebaseApp.auth().createUser({
      displayName: userData.name,
      email: userData.email,
      password: userData.password,
    });

    const createdTenant = await this.model.tenant.create({
      data: {
        id: fireBaseUser.uid,
        name: userData.name,
        email: userData.email,
      },
    });

    return createdTenant;
  }
}
