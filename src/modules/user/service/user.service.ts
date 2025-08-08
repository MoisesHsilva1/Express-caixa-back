import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/service/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly model: PrismaService) {}

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.model.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });
  }
}
