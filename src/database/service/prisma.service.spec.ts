import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe.skip('PrismaService', () => {
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    await prismaService.onModuleInit();
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });
});
