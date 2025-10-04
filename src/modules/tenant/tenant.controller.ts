import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { TenantService } from './service/tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @ApiOperation({ summary: 'Create Tenant' })
  @ApiResponse({ status: 201, description: 'Success' })
  async create(@Body() data: CreateTenantDto) {
    return this.tenantService.create(data);
  }
}
